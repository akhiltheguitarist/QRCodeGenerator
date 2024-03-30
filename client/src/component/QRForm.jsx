import { useState } from 'react'

const QRForm = () => {

    const [url, setUrl] = useState('')
    const [err, setErr] = useState('')
    const [qrCode, setQRCode] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(url.trim() !== ''){
            try{
                const response = await fetch(`http://localhost:3030/generate?url=${encodeURIComponent(url)}`)

                if(!response.ok){
                    throw new Error('Failed to generate QR code')
                }

                const qrCodeData = await response.blob()
                const qrCodeImageUrl = URL.createObjectURL(qrCodeData)
                setQRCode(qrCodeImageUrl)
            }
            catch(error){
                setErr('Failed to generate QR')
            }
        }
        else{
            setErr('Please enter URL')
        }
    }

    return(
        <div style={ { marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <form 
            style= {{width: '300px'}}
            onSubmit={handleSubmit}>
                <label>Enter the URL: </label>
                <br />
                <input 
                    style={{
                        width: '100%',
                        padding: '10px',
                        margin: '5px 0',
                        boxSizing: 'border-box',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        fontSize: '16px'}}
                    type="text"
                    id="url"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}/>
                <br /> <br />
                <button
                    type="submit"> Generate QR Code</button>
            </form>
            {err && <p style={{color: 'red'}}>{err}</p>}
            {qrCode && (
                <div>
                    <img src={qrCode} atl="QR Code" />
                </div>
            )}
        </div>
    )
}

export default QRForm