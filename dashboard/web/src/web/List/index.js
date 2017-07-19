import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

export default class ResourceList extends React.Component {
  constructor (props) {
    super(props)

    this.onRowSelection = this.onRowSelection.bind(this)
  }
  onRowSelection ([selected]) {
    this.props.onTouchTap(this.props.data[selected])
  }
  render () {
    return (
      <div style={ { display: 'flex', height: '100%', width: '100%', flex: 1 } }>
        <Table onRowSelection={ this.onRowSelection }>
          <TableHeader>
            <TableRow>
              { this.props.columns.map(column => <TableHeaderColumn key={ column }>{ column }</TableHeaderColumn>) }
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              this.props.data.map((datum) => {
                return (
                  <TableRow>
                    { this.props.columns.map(column => <TableRowColumn key={ column }>{ get(datum, column) }</TableRowColumn>) }
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}

ResourceList.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  onTouchTap: PropTypes.func,
}

ResourceList.defaultProps = {
  data: [],
  columns: ['title', 'description'],
  onTouchTap: () => {},
}
