import React from "react"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"
import {Text, Box} from 'grommet';

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom:0,
            marginTop: 0,
            display: 'flex',
            flexDirection:'row',
            justifyContent:'space-between',
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            .{title}
          </Link>
          <div>
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            <Text>/about</Text>
          </Link>

          </div>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      //background: #F5F6F7;
      <div style={{
        background: '#F5F6F7',
        height:'100vh',
      }}>
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: '82rem',

            background: 'white',
            boxShadow: '0 16px 48px rgba(222, 223, 224, 0.12)',
            //padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <header style={{
            background: '#f4f5f5',
            padding: '15px'
          }}>{header}</header>
          <main>{children}</main>
          <footer>

          </footer>
        </div>
      </div>
    )
  }
}

export default Layout
