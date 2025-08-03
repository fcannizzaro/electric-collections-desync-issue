import type { Txid } from "@tanstack/electric-db-collection";

export async function generateTxId(tx: any): Promise<Txid> {
  const result = await tx.execute(
    `SELECT pg_current_xact_id()::xid::text as txid`
  );
  const txid = result.rows[0]?.txid;

  if (txid === undefined) {
    throw new Error(`Failed to get transaction ID`);
  }

  return parseInt(txid, 10);
}
