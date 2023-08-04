import stylePreLoader from './PreLoader.module.css'

export const PreLoader = () => {
  return (
    <div className={stylePreLoader.containerPre}>
      <img className={stylePreLoader.img} src={require('../../Images/Pikachu_Caminando.a4704ab5.gif')} alt="loading..." />
    </div>
  )
}
