import { BigQuery } from '@google-cloud/bigquery'

const gcloudProject = process.env.GCLOUD_PROJECT
export const bigQueryProjectId = gcloudProject
export const bigQueryExternalDataset = 'external_data_stream' // Dataset used for storing events sourced from external providers
export const bigQueryInternalDataset =
  bigQueryProjectId === 'celo-mobile-alfajores' ? 'mobile_wallet_dev' : 'mobile_wallet_production'

const bigQuery = new BigQuery({ projectId: `${bigQueryProjectId}` })

export const trackEvent = async (table: string, row: any) => {
  try {
    if (!gcloudProject) {
      throw new Error('No GCloud Project specified')
    }

    await bigQuery.dataset(bigQueryExternalDataset).table(table).insert(row)
  } catch (error) {
    console.info(`BigQuery error:`, JSON.stringify(error))
    throw error
  }
}

export const deleteDuplicates = async (table: string) => {
  try {
    if (!gcloudProject) {
      throw new Error('No GCloud Project specified')
    }

    const sqlQuery = `
      CREATE OR REPLACE TABLE ${bigQueryProjectId}.${bigQueryExternalDataset}.${table}
      AS
      SELECT DISTINCT * FROM ${bigQueryProjectId}.${bigQueryExternalDataset}.${table}
    `

    await bigQuery.query(sqlQuery)
  } catch (error) {
    console.error(`BigQuery error:`, JSON.stringify(error))
    throw error
  }
}

export function getBigQueryInstance() {
  return bigQuery
}
