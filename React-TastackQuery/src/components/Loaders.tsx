import { FadeLoader } from "react-spinners"


function Loaders() {
    return <FadeLoader
        color='red'
        cssOverride={{
            display: 'block',
            margin: '0 auto',
            borderColor: '#d2db4e',
            
        }}
    />
}

export default Loaders