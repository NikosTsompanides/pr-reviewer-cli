export class GithubClientError extends Error {
  name = "GithubClientError" as const;
}

export class OpenAIClientError extends Error {
  name = "OpenAIClientError" as const;
}

export class FileSystemError extends Error {
  name = "FileSystemError" as const;
}
