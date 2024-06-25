import App from './app.js';
import AuthRoute from './routes/auth.route.js';
import IndexRoute from './routes/index.route.js';
import UsersRoute from './routes/users.route.js';
import RoomsRoute from './routes/room.route.js';
import BookingsRoute from './routes/booking.route.js';

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new RoomsRoute(), new BookingsRoute()]);

app.listen();
