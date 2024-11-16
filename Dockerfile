FROM denoland/deno:2.0.6
WORKDIR /app
COPY . .
RUN deno cache main.ts
RUN deno task build

USER deno
EXPOSE 8000

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "main.ts"]
