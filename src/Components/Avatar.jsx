const Avatar = ({src, alt, initials}) => {
    const avatarStyle = {
			width: '40px',
			height: '40px',
			borderRadius: '50%',
			overflow: 'hidden',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: '#ccc',
			fontSize: '1rem',
			color: '#fff',    
    }

		return (
			<div style={avatarStyle} className="avatar">
				{src ? (
					<img src={src} alt={alt} style={{ width: '100%', height: '100%' }} />
				) : (
					<span>{initials}</span>
				)}
			</div>
		)

}