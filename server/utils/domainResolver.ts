import dns from 'dns/promises';

export async function resolveDomain(initDomain: string, initPort: number): Promise<{ ip: string; port: number }> {

    // Init variables
    let domain = initDomain
    let port = initPort

    // Unwrap SRV record (if exists)
    try {
        const srvDomain = `_minecraft._tcp.${domain}`;
        const srvRecords = await dns.resolveSrv(srvDomain);
        if (srvRecords.length > 0) {
            const srv = srvRecords[0];
            domain = srv.name
            port = srv.port
        }
    } catch {}

    // Unwrap A record (if exists)
    try {
        const aRecords = await dns.resolve4(domain);
        if (aRecords.length > 0) {
            domain = aRecords[0]
        }
    } catch {}

    // Then return unwrapped ip and port
    return { ip: domain, port }
}