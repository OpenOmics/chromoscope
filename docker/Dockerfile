# Base image for chromoscope/v0.1.1,
# uses Ubuntu Noble (LTS)
FROM ubuntu:24.04

# Depedencies of chromoscope/v0.1.1:
#  - yarnpkg (1.22.19): Fast, reliable and secure npm alternative
#  - python3 (3.11.4): Interactive high-level object-oriented language
#  - python3-pip (23.3): Python package installer

LABEL maintainer="Skyler Kuhn <kuhnsa AT nih.gov>" \
    base_image="ubuntu:24.04" \
    version="v0.1.1"   \
    software="chromoscope" \
    about.summary="Docker image for OpenOmics/chromoscope" \
    about.home="https://github.com/hms-dbmi/chromoscope" \
    about.documentation="https://chromoscope.bio/" \
    about.tags="Genomics"

############### INIT ################
# Create Container filesystem specific 
# working directory and opt directories
# to avoid collisions with the host's
# filesystem, i.e. /opt and /data
RUN mkdir -p /opt2 && mkdir -p /data2
WORKDIR /opt2 

# Set time zone to US east coast 
ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
        && echo $TZ > /etc/timezone

############### SETUP ################
# This section installs system packages 
# required for your project. If you need 
# extra system packages add them here.
RUN apt-get update \
    && apt-get -y upgrade \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y \
        apt-transport-https \
        autotools-dev \
        automake \
        autoconf \
        build-essential \
        bcftools \
        ca-certificates \
        curl \
        gawk \
        git \
        grep \
        gzip \
        locales \
        samtools \
        unzip \
        vcftools \
        wget \
        zlib1g-dev \
        # Install chromoscope dependencies
        npm \
        yarnpkg \
        python3 \
        python3-pip \
    && apt-get clean && apt-get purge \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Set the locale
RUN localedef -i en_US -f UTF-8 en_US.UTF-8

# Make python3 the default interpreter
# and install Python Packages 
RUN ln -sf /usr/bin/python3 /usr/bin/python
RUN pip3 install --upgrade pip  --break-system-packages \
	&& pip3 install argparse  --break-system-packages \
    && pip3 install chromoscope --break-system-packages 


############### MANUAL ################
# Install tools from src manually
# Install chromoscope/v0.1.1 from 
# Github: https://github.com/OpenOmics/chromoscope.git
RUN mkdir -p /opt2/chromoscope/v0.1.1/ \
    && git clone https://github.com/OpenOmics/chromoscope.git --branch master --single-branch /opt2/chromoscope/v0.1.1/ \
    && cd /opt2/chromoscope/v0.1.1/ \
    && rm package-lock.json \
    && npm install -g yarn \
    && yarn install 


################ POST #################
# Add Dockerfile and export environment 
# variables and update permissions
ADD Dockerfile /opt2/chromoscope.dockerfile
RUN chmod -R a+rX /opt2
ENV PATH="/opt2:$PATH"
CMD yarn --cwd /opt2/chromoscope/v0.1.1 start --host 