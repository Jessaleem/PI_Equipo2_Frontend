
const Avatar = ({props}) => {
	console.log('props', props)
	const src = props.image;
	const initials = props.name[0] + props.name[1];
	const alt = `${props.name} avatar`;

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
				<img src={src} alt={alt} style={{ width: '40px', height: '40px' }} />
			) : (
				<span>{initials.toUpperCase()}</span>
			)}
		</div>
	)
}

export default Avatar;