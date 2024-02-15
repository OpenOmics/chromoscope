#!/usr/bin/env bash
set -euo pipefail

# Usage and help message
function usage() {
  cat << EOF

Usage: $(basename "$0") [--help] \\
           [--drivers DRIVER_MUTATIONS] \\
           [--snp-vcf SNP_VCF] \\
           [--snp-idx SNP_INDEX] \\
           [--indel-vcf INDEL_VCF] \\
           [--indel-idx INDEL_INDEX] \\
           [--bam-file BAM_FILE] \\
           [--bam-index BAM_INDEX] \\
            --id IDENTIFER \\
            --batch BATCH_NAME \\
            --sv SV_BEDPE \\
            --cnv CNV_TSV \\
            --genome {hg19 | hg38}

Create a per-sample config file for chromoscope.
Output is directed to standard output. Please see 
the example below for quickly getting started.

Required:
  --id IDENTIFER           Sample ID
  --batch BATCH_NAME       Name of sequencing batch 
  --sv SV_BEDPE            Structural Variation BEDPE
  --cnv CNV_TSV            Copy Number Variation TSV
  --genome {hg19 | hg38}   Reference genome: hg19 or hg38

Optional:
  --drivers DRIVER_MUTATIONS   Known driver mutations
  --snp-vcf SNP_VCF            VCF file of SNPs
  --snp-idx SNP_INDEX          Tabix index of SNPs 
  --indel-vcf INDEL_VCF        VCF file of INDELs
  --indel-idx INDEL_INDEX      Tabix index of INDELs
  --bam-file BAM_FILE          BAM file
  --bam-idx BAM_INDEX          BAI index of BAM file
  --help                       Display help and exit

Example:
  $ ./$(basename "$0") \\
        --id test_id \\
        --batch test_batch \\
        --sv S1_SVs.bedpe \\
        --cnv S1_CNVs.tsv \\
        --genome hg38 \\
    > S1_chromoscope.json

EOF
}

# Functions
function err() { cat <<< "$@" 1>&2; }
function fatal() { cat <<< "$@" 1>&2; usage; exit 1; }
function timestamp() { date +"%Y-%m-%d_%H-%M-%S"; }
function require(){
  # Requires an executable is in $PATH, 
  # as a last resort it will attempt to load
  # the executable or dependency as a module
  # @INPUT $@ = List of executables to check
  for exe in "${@}"; do
    # Check if executable is in $PATH
    command -V "${exe}" &> /dev/null && continue;
    # Try to load exe as lua module
    module load "${exe}" &> /dev/null || \
      fatal "Failed to find or load '${exe}', not installed on target system."
  done
}

function provided() {
  # Checks to see if the argument's value exists
  # @INPUT $1 = name of user provided argument
  # @INPUT $2 = value of user provided argument
  # @CALLS fatal() if value is empty string or NULL
  if [[ -z "${2:-}" ]]; then
    fatal "Fatal: Failed to provide value to '${1}'!";
  fi
}

function hpclink () {
    # Creates a HPC datashare link,
    # given a path to a file in the 
    # datashare directory, by default,
    # it is setup to create URLs pointing
    # /data/$shared_group/datashare.
    # $@ = Data to share 
    # @RETURNS = Helix datashare links
    for f in "$@"; do
        local prefix;
        local group_name;
        prefix=$(
            readlink -e "$f" \
            | awk -F '/datashare'  -v OFS='/' \
                '{n=index($0,"/datashare"); $2=substr($0,n+1); NF=2; print $1,"datashare/"}'
        );
        group_name=$(
            readlink -e "$f" \
            | awk -F '/datashare' '{print $1}' \
            | awk -F '/' '{print $NF}'
        );
        abspath="$(readlink -e "$f")";
        if [[ "$abspath" =~ ^"$prefix" ]]; then 
            link=$(
                echo "$abspath" \
                | sed "s@^$prefix@https:\/\/hpc.nih.gov/\~${group_name}/@g"
            ); 
            echo "$link"; 
        fi; 
    done
}

function main(){
  # Parses args and creates a per-sample JSON config
  # file for chromoscope
  # @INPUT "$@" = command-line arguments
  # Parse command-line options
  # Set defaults for non-required options
  local drivers=""
  local snp_vcf=""
  local snp_idx=""
  local indel_vcf=""
  local indel_idx=""
  local bam_file=""
  local bam_idx=""
  while [[ $# -gt 0 ]]; do
      key="$1"
      case $key in
        -h  | --help) usage && exit 0;;
        --id )        provided "$key" "${2:-}"; id=$2;        shift; shift;;
        --batch )     provided "$key" "${2:-}"; batch=$2;     shift; shift;;
        --sv )        provided "$key" "${2:-}"; sv=$2;        shift; shift;;
        --cnv )       provided "$key" "${2:-}"; cnv=$2;       shift; shift;;
        --genome )    provided "$key" "${2:-}"; genome=$2;    shift; shift;;
        --drivers )   provided "$key" "${2:-}"; drivers=$2;   shift; shift;;
        --snp-vcf )   provided "$key" "${2:-}"; snp_vcf=$2;   shift; shift;;
        --snp-idx )   provided "$key" "${2:-}"; snp_idx=$2;   shift; shift;;
        --indel-vcf ) provided "$key" "${2:-}"; indel_vcf=$2; shift; shift;;
        --indel-idx ) provided "$key" "${2:-}"; indel_idx=$2; shift; shift;;
        --bam-file )  provided "$key" "${2:-}"; bam_file=$2;  shift; shift;;
        --bam-idx )   provided "$key" "${2:-}"; bam_idx=$2;   shift; shift;;
        * ) fatal "Error: Failed to parse unrecognized argument: '${key}'. Do any of your inputs have spaces?";;
    esac
  done

  # Check if all required options 
  # where provided at runtime
  declare -A required_options
  local required_options=(
    ["id"]="${id:-}" 
    ["batch"]="${batch:-}" 
    ["sv"]="${sv:-}" 
    ["cnv"]="${cnv:-}" 
    ["genome"]="${genome:-}" 
  )
  for k in "${!required_options[@]}"; do
    v="${required_options[$k]:-}"
    if [[ -z "${v}" ]]; then
      fatal "Error: Failed to provide all required options... missing -${k} OPTION"
    fi
  done

  # Create JSON file based on the 
  # definition described here:
  # https://chromoscope.bio/loading-data/through-data-config
  # jq is used to filter any key/value
  # pairs who's value is set to an empty
  # string, could probably also do this
  # with awk to remove any dependencies
  # but am using jq to concat multiple
  # json files anyways
cat << EOF | jq -M 'map_values(select(length > 0))'
{
      "id": "${id}",
      "cancer": "${batch}",
      "sv": "$(hpclink ${sv})",
      "cnv": "$(hpclink ${cnv})",
      "assembly": "${genome}",
      "vcf": "$(hpclink ${snp_vcf:-})",
      "vcfIndex": "$(hpclink ${snp_idx:-})",
      "vcf2": "$(hpclink ${indel_vcf:-})",
      "vcf2Index": "$(hpclink ${indel_idx:-})",
      "bam": "$(hpclink ${bam_file:-})",
      "bai": "$(hpclink ${bam_idx:-})",
      "drivers": "$(hpclink ${drivers})"
}
EOF

}

# Check for software dependencies,
# as last resort try to module load 
# the specified tool or dependency
require jq
# Call main method/entry-point
main "$@"