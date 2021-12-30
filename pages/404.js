
export default function Errorpage () {
    return<>
    <div className="error-page bg-gray-800 text-gray-50 ">
        <h1 className="text-red-800">404 ERROR.</h1>
        <span>please go back ..</span>
        <h4 className="capitalize">the possible reasons could be..</h4>
        <ul className="capitalize">
            <li>username already exists.</li>
            <li>email already exists</li>
            <li>email validation  failed  </li>
            <li>registration failed</li>
            <li>login failed</li>


        </ul>
    </div>
    </>
}