o: ActiveSupport::Cache::Entry:@valueI"\// Create an APIPixie instance
APIPixie pixie = new APIPixie("http://api.mydistantservice.com");

// Retrieve an APIService for your object
APIService<Message> msgService = pixie.getService(Message.class);

// Start communicating with the distant API
Message msg = msgService.get(42L);

// Now do stuff with the object!
String text = msg.getText();:ET:@created_atf1389120823.724465:@expires_in0