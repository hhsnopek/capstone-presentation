import React from 'react'
import { Appear, BlockQuote, Cite, CodePane, Deck, Fill, Heading, Image, Layout, Link, ListItem, List, Markdown, Quote, Slide, Spectacle, Text} from 'spectacle'

import CodeSlide from 'spectacle-code-slide'
import preloader from 'spectacle/lib/utils/preloader'
import createTheme from 'spectacle/lib/themes/default'
import Interactive from '../assets/interactive'

const code = require('raw!../assets/permissions.go')

require('normalize.css')
require('spectacle/lib/themes/default/index.css')

const images = {
  carrotLogo: require('../assets/carrot_logo.svg'),
  avatar: require('../assets/avatar.png'),
  orange: require('../assets/twitter_orange.jpg'),
  carrotViceLogo: require('../assets/carrot_vice_logo.jpg'),
  flow: require('../assets/flow.png'),
  mvm: require('../assets/mVm.svg')
}

preloader(images)

const theme = createTheme({
  // must be included ... 😥
  primary: '#FFF',
  secondary: '#FF9012',
  tertiary: '#262626',
  quartenary: '#0084AD',
  // real colors
  white: '#FFF',
  green: '#77BC1F',
  orange: '#FF9012',
  body: '#262626',
  blueberry: '#0084AD',
  eggplant: '#7C2582'
}, {
  // headers
  primary: 'Proxima Nova, sans-serif',
  secondary: 'Proxima Nova, sans-serif',
  // body
  tertiary: 'Proxima Nova, sans-serif'
})

export default class Presentation extends React.Component {
  render () {
    return (
    <Spectacle theme={theme}>
      <Deck transition={['fade']} transitionDuration={500} progress="pacman">
        <Slide bgColor="white">
          <Image src={images.carrotLogo} height="2.5em" />
          <Text
            fit
            caps
            bold
            textColor="orange">
            Admin Dashboard
          </Text>
        </Slide>
        <Slide bgImage={images.orange}>
          <Heading
            fit
            caps
            bold
            textColor="white"
            textSize="2em">
            Who are you?
          </Heading>
        </Slide>
        <Slide bgColor="#8EC449">
          <Layout>
            <Fill>
              <Image src={images.avatar} height="50%" width="50%" />
            </Fill>
          </Layout>
        </Slide>
        <Slide bgColor="white" notes="<ul><li>We're in the demo already!</li><li>Show demo (login, logout)</li></ul>">
          <Text fit textColor="body">
            This presentation currently is an application in this the capstone.
          </Text>
          <Heading fit textColor="green" bold>
            But, how did we get here?
          </Heading>
        </Slide>
        <Slide bgColor="blueberry">
          <Heading fill textColor="white">
            User Flow
          </Heading>
        </Slide>
        <Slide>
          <Image src={images.flow} />
        </Slide>
        <CodeSlide
          textSize="18px"
          lang="go"
          transition={['fade']}
          code={code}
          ranges={[
			  { loc: [ 0, 1], title: 'Permissions Middleware' },
			  { loc: [13, 17], note: 'Send a Google OAuth Token with in the header of your request' },
			  { loc: [34, 36], note: 'Verify content-type in the request' },
			  { loc: [37, 38], note: "Parse the request's url for the app name" },
			  { loc: [92, 95], note: 'Determine if the user has access from the OAuth token' },
			  { loc: [53, 55], note: 'Compare Google Auth token with the app' }]} />
        <Slide>
          <Heading fit textColor="eggplant">
            Neato, but why?
          </Heading>
        </Slide>
        <Slide notes="<ul><p>Monolithic</p><li>[-] ~7s page load</li><li>[-] load every app, not just the one you're accessing</li><li>[+] Everything is in one repository</li><p>Micro Services</p><li>[+] bottleneck becoems the app not the architecture</li><li>[+] Resusable, Simple & Future Updates</li><li>[-] a lot of things to keep track of</li></ul>">
          <Image width="100%" src={images.mvm} />
        </Slide>
        <Slide bgColor="body">
          <Heading caps fit textColor="orange">
            Difficulties
          </Heading>
          <List>
            <ListItem textColor="white">
              Design
            </ListItem>
            <ListItem textColor="white">
              Scalability
            </ListItem>
            <ListItem textColor="white">
              Future Updates
            </ListItem>
            <ListItem textColor="white">
              Debugging
            </ListItem>
            <ListItem textColor="white">
              Carrot Requests & Requirements
            </ListItem>
          </List>
        </Slide>
        <Slide bgColor="blueberry" notes="<ul><li>Solves scalability & future updates</li><li>useability becomes easy, just take a look</li></ul>">
          <Heading textColor="white">
            Deployment
          </Heading>
          <Heading textColor="body">
            With
          </Heading>
          <Heading textColor="body">
            Docker
          </Heading>
          <Heading>
            {"🐳"}
          </Heading>
        </Slide>
        <Slide bgColor="blueberry">
          <CodePane textSize="18px" lang="bash">
            {"# Deploy the whole backend\n$ docker-compose up\n\n# Deploy a single container\n$ docker build url/to/docker_image"}
          </CodePane>
        </Slide>
        <Slide bgColor="eggplant" notes="<ul><li>~300 cups of coffee</li><li>~160 hrs</li></ul>">
          <Heading fill caps textColor="white">
            Effort
          </Heading>
        </Slide>
        <Slide>
          <Heading caps fit textColor="green">
            What I've have learned
          </Heading>
          <List textColor="body">
            <ListItem>
              I drink to much coffee
              {"☕️"}
            </ListItem>
            <ListItem>
              Docker setup & deployment
            </ListItem>
            <ListItem>
              I feel like a nginx wizard
              {"✨ 🔮✨"}
            </ListItem>
            <ListItem>
              How to build services for *nix machine
            </ListItem>
          </List>
        </Slide>
        <Slide bgColor="orange" notes="<ul><li>Co-worker at Carrot broke my demo yesterday</li><li>Currently being developed until it's complete</li><li>Build out all the apps, as SPAs</li></ul>">
          <Heading fit textColor="white">
            The Future
          </Heading>
          <Heading fill textColor="white">
            of the
          </Heading>
          <Heading fit textColor="white">
            Dashboard
          </Heading>
        </Slide>
        <Slide bgColor="green">
          <Heading textColor="white">
            Thank you,
          </Heading>
          <Heading fit textColor="white">
            Questions?
          </Heading>
        </Slide>
        <Slide>
          <Image src={images.carrotViceLogo} height="3.5em" />
        </Slide>
      </Deck>
    </Spectacle>
    )
  }
}
