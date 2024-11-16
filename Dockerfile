FROM denoland/deno:2.0.6
WORKDIR /app
ADD . /app
RUN deno task build
CMD ["run", "--allow-net", "--allow-env", "--allow-read", "main.ts"]
