REVISION := $(shell git rev-parse --short HEAD)

deploy:
	gcloud builds submit --project=premices-373106 --substitutions=SHORT_SHA=$(REVISION) --config cloudbuild.yaml
