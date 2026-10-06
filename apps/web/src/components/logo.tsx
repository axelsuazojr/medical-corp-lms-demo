import Image from 'next/image'
export function Logo({compact=false}:{compact?:boolean}) {
  return <div className="brand"><Image src="/brand/medical-corp-logo.png" alt="Medical Corp" width={80} height={80} priority />{!compact && <strong style={{color:'var(--navy)',letterSpacing:'.02em'}}>MEDICAL CORP</strong>}</div>
}
