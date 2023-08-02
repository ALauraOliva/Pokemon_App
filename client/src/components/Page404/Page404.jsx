import stylePage404 from './Page404.module.css'

export const Page404 = () => {
    return (
        <div className={stylePage404.contenedorPage404}>
            <p className={stylePage404.p}> PAGE NOT FOUND </p>
            <img className={stylePage404.img} src={require('../../Images/pikachuSurprised404.png')} alt="loading..." />
        </div>
    )
}