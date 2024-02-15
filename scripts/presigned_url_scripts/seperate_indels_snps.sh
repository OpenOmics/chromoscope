#!/usr/bin/env bash
set -euo pipefail

# Usage and help message
function usage() {
  cat << EOF

Usage: $(basename "$0") [-h] \\
          VCF_FILE OUTPUT_PREFIX

Positional Arguments:
  [1] Input VCF.gz file: SNPs & INDELs found in
      this VCF file will be seperated into two
      seperate files.
  [2] Output prefix: Used to build file names 
      of the two output VCF files. Given a prefix 
      the following two files will be 
      created:
        i)  \${prefix}.SNPs.vcf.gz
        ii) \${prefix}.INDELs.vcf.gz

Optional:
  -h, --help    Display help message and exit

Example:
  $(basename "$0") S1.norm.vcf.gz S1.norm

EOF
}

# Functions
function err() { cat <<< "$@" 1>&2; }
function fatal() { cat <<< "$@" 1>&2; usage; exit 1; }
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

# Check for help option
{ [ "${1:-}" == '-h' ] ; } \
    || { [ "${1:-}" == '--help' ] ; } \
    || { [ "${1:-}" == '--help' ] ; } \
    || { [ "${1:-}" == '-help' ] ; } \
    && usage && exit 0

# Sanity check: was anything was provided?!
{ [ -z "${1:-}" ] ; } || { [ -z "${2:-}" ] ; } \
    && fatal "Error: Did not provide all required positional args!"

# Check for software dependencies
require gatk

# Collect command line arguments
IN_VCF="${1}"
OUT_VCF_PREFIX="${2}"

# Create output directory
output_directory=$(dirname "$OUT_VCF_PREFIX")
mkdir -p "$output_directory"

# Extract SNPs from input VCF 
echo "Using input ${IN_VCF} and writing ${OUT_VCF_PREFIX}.SNPs.vcf.gz"
gatk SelectVariants \
     -R /data/GRIS_NCBR/resources/Homo_sapiens_assembly38.fasta \
     -V "${IN_VCF}" \
     --select-type-to-include SNP \
     -O "${OUT_VCF_PREFIX%.}.SNPs.vcf.gz"

# Extract INDELs from input VCF 
echo "Using input ${IN_VCF} and writing ${OUT_VCF_PREFIX}.INDELs.vcf.gz"
gatk SelectVariants \
     -R /data/GRIS_NCBR/resources/Homo_sapiens_assembly38.fasta \
     -V "${IN_VCF}" \
     --select-type-to-include INDEL \
     -O "${OUT_VCF_PREFIX%.}.INDELs.vcf.gz"
