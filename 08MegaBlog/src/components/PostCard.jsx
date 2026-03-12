import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-red-100 rounded-xl p-4'>

                {featuredImage && (
                    <div className='w-full justify-center mb-4'>
                        <img
                            src={appwriteService.getFilePreview(featuredImage)}
                            alt={title}
                            className="w-full h-48 object-cover rounded-xl"
                            onError={(e) => e.target.style.display = "none"}
                        />
                    </div>
                )}

                <h2 className='text-xl font-bold'>
                    {title}
                </h2>

            </div>
        </Link>
    )
}

export default PostCard