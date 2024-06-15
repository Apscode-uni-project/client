import './main-outlet.scss'
// eslint-disable-next-line react/prop-types
const MainOutlet = ({children, title}) => {
  return (
    <div id="mainOutlet">
        <h1 className='title'>{title}</h1>
        <div className="children">
            {children}
        </div>
    </div>
  )
}

export default MainOutlet