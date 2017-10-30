const mountNode = document.getElementById('mountNode')

// Router declarations
const Router = ReactRouter.Router; 
const Route = ReactRouter.Route;
const DefaultRoute = ReactRouter.DefaultRoute;
const Link = ReactRouter.Link; 
const RouteHandler = ReactRouter.RouteHandler;
const IndexRoute = ReactRouter.IndexRoute;

class AddComponent extends React.Component {

    // Après le construteur le premier c'est, « componentWillMount » 
    // c’est avant le rendu donc vous pouvez faire un « setState », 
    // ça va écraser le « state » de base du constructeur. 
    //Le constructeur définit un « state » et vous pouvez refaire un « setState », 
    // ça peut être intéressant si vous avez quelque chose à ré-écraser ou à modifier.
    // En gros, avant le rendu on peut écraser le state avec un setState ici.
    componentWillMount() {
        //console.log('componentWillMount')
    }

    // Après le rendu, on va accéder aux « refs ». 
    // C’est très important, ça veut dire que le composant a été rendu dans 
    // l’interface et vous avez accès à toutes les « refs » que vous avez définies.
    // C’est à cet endroit-là que vous travaillerez sur les « refs », si besoin. 
    // En gros, c'est après le rendu, on accède aux refs
    componentDidMount() {
        //console.log('componentDidMount')
    }

    // ComponentWillReceiveProps intervient à la mise à jour des « props ». 
    // Quand vous passez des propriétés des « props » à un composant, 
    // ou vous faites un « setState », par exemple, ça va se lancer. 
    // Attention, parce que celui-ci va démarrer un rendu au travers du 
    // moteur de rendu donc il va rafraîchir le composant. 
    // Sachez que c’est très important. On peut ici faire un « setState », 
    // sans avoir besoin d’un rendu supplémentaire. 
    // Si vous refaites un « setState », vous allez avoir une phase de 
    // rendu donc cet événement-là vous permet de faire également un « setState » 
    // comme ça vous évitez d’avoir deux rendus, vous n'en aurez qu’un seul.
    // En gros, à la mise à jour des props, on peut aussi faire un setState sans avoir rendu supplémentaire (optim)
    componentWillReceiveProps() {
        //console.log('componentWillReceiveProps')
    }

    // Le « shouldComponentUpdate » va donner l’information à React s’il doit ou pas faire le rendu, 
    // le rendu final donc recompiler la vue pour vous l’afficher. 
    // Si vous faites un « return false », le seul où on peut faire ça, 
    // gardez bien ça en tête, si vous faites un « return false » il ne lancera 
    // pas les deux événements suivants, « WillUpdate », « DidUpdate ». 
    // Cela peut être intéressant, notamment quand on a beaucoup de composants imbriqués. 
    // On a peut-être envie d’en mettre à jour qu’un seul, ou un autre ou 
    // on veut tester des choses, vous pouvez mettre de la logique là-dedans, 
    // vérifier, faire un « return true » ou un « return false ».
    // De base, c'est forcément « return true » et si vous voulez bloquer le rechargement, 
    // le « return false » vous permettra d’éviter d’avoir des rendus obsolètes qui ne servent à rien.
    // En gros, à la mise à jour props ou state, on peut retourner false pour ne pas faire de rendu
    shouldComponentUpdate() {
        //console.log('shouldComponentUpdate');
        return true;
    }

    // Le « componentWillUpdate » interviendra avant la mise à jour du rendu 
    // concrètement on a la mise à jour, on a le rendu qui va partir, 
    // on peut préparer des choses à cet endroit-là et ensuite, 
    // une fois qu’on aurait préparé, on va aller sur « componentDidUpdate ».
    // Engros, à la mise à jour avant le rendu, on peut préparer des petites choses avant le rendu
    componentWillUpdate() {
        //console.log('componentWillUpdate');
    }

    // Attention, le « componentDidUpdate » est le seul endroit, 
    // le seul événement dans lequel vous accédez au DOM qui a été rafraîchi.
    // Tous les éléments du DOM, si vous avez besoin de travailler dessus, 
    // seront dans « componentDidUpdate ». Le composant est rendu, 
    // le composant est disponible et, surtout, le DOM est disponible
    // En gros, après le rendu, on accède au nouveau DOM
    componentDidUpdate() {
        //console.log('componentDidUpdate');
    }

    // S'il arrive à un moment ou à un autre d’avoir à détruire un composant, 
    // Et vous avez besoin de faire des nettoyages, supprimer des variables, 
    // faire des « reset » de « timer », vous le ferez dans « componentWillUnmount ».
    // C’est un événement qui sera lancé directement après le démontage, quand un composant n’est plus disponible. 
    // En gros, après le démontage, on peut faire du nettoyage ici
    componentWillUnmount() {
        //console.log('componentWillUnmount')
    }

    constructor() {
        // 1er call est forcement le construtor.
        //console.log('construtor')
        super()
        this.state ={task: ""}
        this.submit = this.submit.bind(this)
        this.update = this.update.bind(this)
    }

    submit(e) {
        e.preventDefault()
        this.props.onSubmit({user: this.props.name, task: this.inputRef.value})
        this.inputRef.value = ""
    }

    update() {
        this.setState({query: this.inputRef.value})
    }

    render() {
        return (
        <form onSubmit={this.submit}>
            <h2>Ajouter une tache :</h2>
            <input ref={(inputRef) => this.inputRef = inputRef} 
                    onChange={this.update}
                    placeholder="doit faire ..."/>
            <button>Ajouter</button>
        </form>
        );
    }
}

class MainComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = mainReducer({}, undefined);
        this.changeName = this.changeName.bind(this)
        this.addItem = this.addItem.bind(this)
    }

    componentWillMount() {
        // console.log('Redirection')
        // this.props.history.push('/users')
    }

    static getData() {
        return {
            actual: 'David Caramelo', 
            users: [
                {name: 'David Caramelo', role: 'Lead', age: 34}, 
                {name: 'Toto Caramelo' , role: 'dev'}, 
                {name: 'Titi Caramelo' , role: 'junior'}], 
            items: []}
    }

    dispatch(action, v) {
        this.setState(prevState => mainReducer({type: action, value: v}, prevState));
    }

    changeName(key) {
        this.dispatch('CHANGE_USER', key)
    }

    addItem(item) {
        console.log('ICI', item)
        this.dispatch('ADD_TASK', item)
    }

    render() {
        return (
            <div>
                <MenuComponent />
                <h1 style={{color: this.props.color}}
                    ref={(titleRef) => this.titleRef = titleRef}>
                Tache pour {this.state.actual}!
                </h1>

                <h2>Choisir un membre :</h2>
                <ul>
                    {this.state.users.map((user, i) => {
                        var change = this.changeName.bind(this, i);
                        return <li key={i} onClick={change}>{user.name} </li>;
                    })}
                </ul> 
    
                <h2 className={this.state.items.length ? '' : 'hidden'}>Tâches :</h2>
                <ul>
                    {this.state.items.map((item, i) => {
                        return <li key={i}>{item.task} pour {item.user}</li>;
                    })}
                </ul>

                <AddComponent onSubmit={this.addItem} name={this.state.actual}/>
            </div>
            );
        }
    }

    // Props par déflaut si color n'est pas défini
    MainComponent.defaultProps = {color: 'red'}

    // Check props type (https://reactjs.org/docs/typechecking-with-proptypes.html)
    MainComponent.propTypes = {
    color: React.PropTypes.string.isRequired
}

class UsersComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <MenuComponent />
                <h1>Utilisateurs :</h1>
                <ul>
                    {MainComponent.getData().users.map((u, i) => {
                        return <li key={i} ><Link activeClassName="activeUser" to={{pathname: `/users/${i}`}}>{u.name}</Link></li>
                    })}
                </ul>
            </div>
        )
    }
}

class UserComponent extends React.Component {

    constructor(props) {
        // params du router
        console.log(props)
        super(props)
        this.getTask = props.location.query.getTask
        this.userId = props.routeParams.userId
        this.userDetail = MainComponent.getData().users[this.userId]
    }

    render() {
        return (
            <div>
                <MenuComponent />
                <h1>Utilisateur {this.userDetail.name}</h1>
                <p>{this.userDetail.role}</p>
                <p>{this.userDetail.age}</p>
            </div>
        )
    }
}

class MenuComponent extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link activeClassName="active" to={`/`}>Home</Link></li>
                    <li><Link activeClassName="activeUser" to={`/users`}>Users</Link></li>
                    <li><Link activeClassName="activeUser" to={{pathname: `/users/user`, query: {getTask: true}}}>User Détail</Link></li>
                </ul>
            </div>
        )
    }
}

let mainReducer= (action, store = MainComponent.getData()) => {
    switch(action.type) {
        case 'ADD_TASK':
            store.items.push(action.value);
            console.log('ADD_TASK')
            return store
        case 'CHANGE_USER':
            store.actual = store.users[action.value].name;
            console.log('CHANGE_USER')
            return store;
        default:
            return store;
    }
}

// Sans la route
// ReactDOM.render(<MainComponent color="blue"/>, mountNode);
// OR
// let MainComponentElement = React.createElement(MainComponent, {color: 'red'})
// ReactDOM.render(MainComponentElement, mountNode)

ReactDOM.render((
    <Router>
        <Route path="/" component={MainComponent}/>
        <Route path="users">
            <IndexRoute component={UsersComponent}/>
            <Route path=":userId" component={UserComponent}/>
        </Route>
    </Router>
), mountNode);