import type { ConfigFile } from '@rtk-query/codegen-openapi'

// TODO: Change paths
const config: ConfigFile = {
    schemaFile: 'swagger.json',
    apiFile: 'emptyApi.ts',
    apiImport: 'emptySplitApi',
    outputFile: 'webApi.ts',
    exportName: 'webApi',
    hooks: true,
}

export default config