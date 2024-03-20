import React from 'react'
import { Task, columns } from './columns'
import { DataTable } from './data-table'
import { data } from './data'

async function getData(): Promise<Task[]> {
  return data
}

export default async function Tasks() {
  const data = await getData()
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
