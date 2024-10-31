# local testing

To test this package locally before it is published to npm, run this command in the context of this repo:
`pnpm link --global`

Then switch your working directory to the repository which you want to utilize these types and run this command:
`pnpm link --global orbitdb-types`

Once you are done testing, this package is published to npm and you wish to use that version
`pnpm unlink --global orbitdb-types`

Then you can run
`pnpm i -D orbitdb-types`

If these types are not regonized by your project, check your `tsconfig.json` file. It should have a typeRoots definition:

```json
{
  "compilerOptions": {
    "typeRoots": [
      "./node_modules",
      "./node_modules/@types",
    ],
    ...
  }
}
```
