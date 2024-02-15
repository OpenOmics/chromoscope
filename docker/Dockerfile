# Base image for chromoscope/v0.1.1,
# uses node/18 (debian bookworm LTS)
FROM node:18-bookworm-slim

# Depedencies of chromoscope/v0.1.1:
#  - yarn: Fast, reliable and secure npm alternative
#  - python3: Interactive high-level object-oriented language
#  - python3-pip: Python package installer

LABEL maintainer="Skyler Kuhn <kuhnsa AT nih.gov>" \
    base_image="node:18_debian:12" \
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
        build-essential \
        ca-certificates \
        curl \
        gawk \
        git \
        grep \
        gzip \
        locales \
        unzip \
        wget \
        zlib1g-dev \
        # Install chromoscope dependencies
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
	&& pip3 install argparse --break-system-packages \
    && pip3 install chromoscope --break-system-packages 

############### MANUAL ################
# Install tools from src manually
# Install chromoscope/v0.1.1 from 
# Github: https://github.com/OpenOmics/chromoscope.git
RUN mkdir -p /opt2/chromoscope/v0.1.1/ 
COPY . /opt2/chromoscope/v0.1.1/
RUN cd /opt2/chromoscope/v0.1.1/ \
    && yarn install

################ POST #################
# Add Dockerfile and export environment 
# variables and update permissions
ADD docker/Dockerfile /opt2/chromoscope.dockerfile
CMD yarn --cwd /opt2/chromoscope/v0.1.1 start --host
