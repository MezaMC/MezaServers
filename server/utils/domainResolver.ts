import dns from 'dns/promises';

// govnocodng with chatgpt cuz i have no clue how to make this network things

export async function resolveDomain(domain: string, port: number): Promise<{ ip: string; port: number }> {
    const srvDomain = `_minecraft._tcp.${domain}`;

    // Maybe it's SRV record?
    try {
        const srvRecords = await dns.resolveSrv(srvDomain);
        if (srvRecords.length > 0) {
            const srv = srvRecords[0];
            const aRecords = await dns.resolve4(srv.name);

            if (aRecords.length > 0) {
                return { ip: aRecords[0], port: srv.port };
            }
        }
    } catch {}

    // No. Then maybe it's domain with A record?
    try {
        const aRecords = await dns.resolve4(domain);
        if (aRecords.length > 0) {
            return { ip: aRecords[0], port };
        }
    } catch {}

    // Again no. Then it's just IP
    return { ip: domain, port }
}