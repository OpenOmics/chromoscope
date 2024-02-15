#!/usr/bin/env bash
set -euo pipefail

# Usage and help message
function usage() {
  cat << EOF

Usage: $(basename "$0") [-h] \\
           JSON_FILE_1 JSON_FILE_2 JSON_FILE_N

Positional Arguments:
  One or more JSON files to merge into an array 
  of JSON objects. Each JSON file is added as an
  element to the array.

Optional:
  -h, --help    Display help message and exit

Example:
  $(basename "$0") S1.json S2.json > all.json

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

# Sanity check: was anything was provided?!
{ [ -z "${1:-}" ] ; } \
    && fatal "Error: Did not provide any input files!"

# Check for help option
{ [ "${1:-}" == '-h' ] ; } \
    || { [ "${1:-}" == '--help' ] ; } \
    || { [ "${1:-}" == '--help' ] ; } \
    || { [ "${1:-}" == '-help' ] ; } \
    && usage && exit 0

# Check for software dependencies
require jq

# Merge multiple JSON files with jq
jq -M -n \
    'reduce inputs as $in (null; 
    . + if $in|type == "array" 
    then $in else [$in] end)' \
    "$@"