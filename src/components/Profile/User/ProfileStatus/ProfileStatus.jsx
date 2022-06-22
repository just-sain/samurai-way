import React from 'react';

import s from './ProfileStatus.module.scss';

class ProfileStatus extends React.Component {
	componentDidUpdate = (prevProps, prevState) => {
		if (prevProps.status !== this.props.status) {
			this.setState({ status: this.props.status });
		}
	};

	state = {
		editDescMode: false,
		status: this.props.status || '',
	};

	activatedEditMode = () => {
		this.setState({
			editDescMode: true,
		});
	};

	deactivatedEditMode = () => {
		this.setState({
			editDescMode: false,
		});
		if (this.props.status !== this.state.status) {
			if (this.state.status.length <= 300) {
				this.props.updateStatus(this.state.status);
			} else {
				alert('max status length must be below 300!');
			}
		}
	};

	onStatusCahnge = e => {
		this.setState({
			status: e.currentTarget.value,
		});
	};

	render() {
		return (
			<>
				<div className={s.about}>
					<h2>{this.props.fullName}</h2>
					<p className={s.description} onDoubleClick={this.activatedEditMode}>
						Status:
						{!this.state.editDescMode ? (
							<span className={s.descriptionText}>{this.props.status || '/ no status'}</span>
						) : (
							<input
								className={s.descriptionInput}
								autoFocus
								type='text'
								value={this.state.status}
								onChange={this.onStatusCahnge}
								onBlur={this.deactivatedEditMode}
							/>
						)}
					</p>
					{/* <p>About Me: { this.props.aboutMe ? this.props.aboutMe : "nothing found" }</p> */}
					<h3>
						Looking for a job:{' '}
						<span>
							{this.props.lookingForAJob ? this.props.lookingForAJobDescription : 'have a job'}
						</span>
					</h3>
				</div>
			</>
		);
	}
}

export default ProfileStatus;
