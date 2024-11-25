import React from 'react'

const AddImage = () => {
    return (
        <div>
            <form action="/posts" method="POST" enctype="multipart/form-data">
            <input type="file" name="image" accept="image/*" />
            <input type="text" name="caption" placeholder="Caption" />
            <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddImage