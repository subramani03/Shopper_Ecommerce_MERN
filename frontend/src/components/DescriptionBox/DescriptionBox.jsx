import React from 'react'
import "./DescriptionBox.css"

const DescriptionBox = () => {
    return (
        <div className='DescriptionBox'>
            <div className="DescriptionBox-navigator">

                <div className="DescriptionBox-navbox">Description</div>
                <div className="DescriptionBox-navbox fade">Reviews (122)</div>
            </div>

            <div className="DescriptionBox-Description">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit illum ipsa inventore harum aperiam consectetur iusto fugit minima ex quaerat. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus reiciendis ab tempora, at ex fuga rerum iusto deserunt temporibus amet.</p>

                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit debitis, corporis voluptates mollitia animi ex minima dolorum eaque corrupti suscipit!
                </p>
            </div>

        </div>
    )
}

export default DescriptionBox
