import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import get from 'lodash.get'
import axios from 'axios'
import { observer } from 'mobx-react'
import ImageIcon from 'material-ui/svg-icons/image/image'

class Upload extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      percent: 50,
      preview: null,
    }

    this.onDrop = this.onDrop.bind(this)
  }

  async onDrop (acceptedFiles, rejectedFiles) {
    const signedUrl = await this.props.event.getUploadUrl(acceptedFiles[0].type)
    const file = acceptedFiles[0]
    console.log(file.preview)
    this.setState({ preview: file.preview })

    axios.put(signedUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
      onUploadProgress: (progressEvent) => {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log(percentCompleted)
      },
    })
    .then(() => {
      console.log(signedUrl.split('?')[0])
      this.props.event.image = signedUrl.split('?')[0]
    })
    .catch(console.error.bind(console))
  }

  render () {
    const barStyles = {
      width: `${ this.state.percent }%`,
      height: 10,
      backgroundColor: '#6c0',
    }
    const imageUrl = this.state.preview || this.props.event.image
    console.log('LOWERRENDER', this.props.event, this.props.event.image)
    return (
      <div style={ styles.container }>
        <Dropzone
          accept='image/jpeg, image/png'
          multiple={ false }
          name='profile'
          maxSize={ 2097152 }
          minSize={ 64 }
          onDrop={ this.onDrop }
          className='dropzone'
          style={ { backgroundImage: `url(${ imageUrl })` } }
        >
          { !imageUrl &&
            <div className='dropzone'>
              <h4>Add event photo</h4>
              <ImageIcon color='#999' style={ { width: 64, height: 64 } } />
            </div>
          }
        </Dropzone>
        <div style={ barStyles } />
      </div>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  bar: {
    height: 10,
    backgroundColor: '#6c0',
  },
}
Upload.propTypes = {
  url: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
}

export default observer(Upload)
