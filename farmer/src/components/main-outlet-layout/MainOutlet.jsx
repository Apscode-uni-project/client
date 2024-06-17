import './main-outlet.scss'
// eslint-disable-next-line react/prop-types
const MainOutlet = ({children}) => {
  return (
    <div id="mainOutlet">
        <div className="children">
            {children}
        </div>
    </div>
  )
}

export default MainOutlet