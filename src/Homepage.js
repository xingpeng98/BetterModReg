import {Button, Input,Form} from 'semantic-ui-react';
import Layout from './components/Layout';

function Homepage() {
  return (
    <Layout>
      <div className="Homepage" style={{marginTop:'20px'}}>
        <div class="ui huge header">Homepage</div>
        <Form>
          <div class="ui stacked segment">
            <div class="field">
                <label>Username</label>
                <Input type="text" placeholder="Username"/>
              </div>
              <div class="field">
                <label>Password</label>
                <Input type="text" placeholder="Password"/>
            </div>
          </div>
          <Button>Log In</Button>
        </Form>
        
        
          
        
      </div>
    </Layout>
    
  );
}

export default Homepage;