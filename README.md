# PR Review CLI Tool

A CLI tool that fetches GitHub PR diffs, analyzes them with OpenAI, and generates a Markdown code review to streamline the review process.

### Disclaimer
> This is a Proof of Concept (POC) tool. It is not intended for general use in production environments. Use it at your own risk. The tool is provided "as is" with no warranty, and any feedback or improvements are welcome.

## Features

- Fetches a pull request's diff from GitHub.
- Uses OpenAI's GPT to generate code review feedback.
- Saves the generated review in a Markdown file.
- Option to override existing reviews or create new ones.
- Easy-to-use command-line interface with configurable options.

## Installation

1. Clone this repository
```bash
git clone https://github.com/NikosTsompanides/pr-reviewer-cli.git
```
2. Install the required dependencies:
```bash
npm i
```
3. Create a .env file in the root of the project:
```bash
cp .env.sample .env
```
4. Update the .env file
```plaintext
GITHUB_TOKEN=<GH_TOKEN>
OPENAI_API_KEY=<OPENAI_API_KEY>
```

## Usage

Run the tool with the following command:

```bash
npm run start -- \
  --owner "your-github-username" \
  --repo "your-repository-name" \ 
  --pr 1234 \
  ### Optional cli options
  --filename "PR_1234_Review" \
  --folder "./reviews" \ 
  --override true
```

### CLI Options:

* `--owner` (string): GitHub repository owner (your username or organization).
* `--repo` (string): GitHub repository name.
* `--pr` (number): Pull request number to review.
* `--filename` (string/ **optional**): Name for the generated review file (default: PR_<pr_number>_Review).
* `--folder` (string / **optional**): Folder where the review file will be saved (default: ./reviews).
* `--override` (boolean / **optional**): Whether to overwrite existing review files (default: false).

### How It Works

1. The tool fetches the PR diff from GitHub.
2. It sends the diff to OpenAI to generate a code review.
3. The review is saved as a Markdown file in the specified folder.

### Future Improvements

- Integrate with GitHub Actions to automatically trigger the review process.
- Enhance the AI’s ability to handle more complex review scenarios.
- Add more customizable options, like review categories (e.g., performance, security, etc.).
- Implement more advanced error handling and logging features.

### Contributing

Feel free to fork the repository and submit pull requests. Contributions and suggestions are always welcome!

### License

This project is licensed under the MIT License.
