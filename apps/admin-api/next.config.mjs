import { withPayload } from '@payloadcms/next/withPayload'
const nextConfig={poweredByHeader:false,serverExternalPackages:['sharp'],async headers(){return [{source:'/(.*)',headers:[{key:'X-Content-Type-Options',value:'nosniff'},{key:'X-Frame-Options',value:'SAMEORIGIN'},{key:'Referrer-Policy',value:'strict-origin-when-cross-origin'}]}]}}
export default withPayload(nextConfig)
