## Steps for Building Docker Images

Directly below are instructions for building an image using the provided Dockerfile:

```bash
# See listing of images on computer
docker image ls

# Build from Dockerfile
docker build --no-cache -f Dockerfile --tag=openomics_chromoscope:v0.1.0 ..

# Start the application with yarn
# visit: http://localhost:3000/app/
docker run -ti -p 3000:3000 openomics_chromoscope:v0.1.0

# Updating Tag  before pushing to DockerHub
docker tag openomics_chromoscope:v0.1.0 skchronicles/openomics_chromoscope:v0.1.0
docker tag openomics_chromoscope:v0.1.0 skchronicles/openomics_chromoscope         # latest

# Check out new tag(s)
docker image ls

# Push new tagged image to DockerHub
docker push skchronicles/openomics_chromoscope:v0.1.0
docker push skchronicles/openomics_chromoscope:latest
```

### Other Recommended Steps

Scan your image for known vulnerabilities:

```bash
docker scan openomics_chromoscope:v0.1.0
```

> **Please Note**: Any references to `skchronicles` should be replaced your username if you would also like to push the image to a non-org account.
