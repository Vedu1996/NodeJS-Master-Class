class Router {
    constructor(handlerObject) {
        this.routerMap = handlerObject;
    }

    notFound(req, respondWith) {
        respondWith(404, `Could not ${req.method.toUpperCase()} ${req.trimmedPath}`);
    }

    findMatches(possibilities, path) {
        return possibilities.filter(possiblePath => {
            const pathChunks = path.split('/');
            const possiblePathChunks = possiblePath.split('/');
            let routeMatch = true;
            pathChunks.forEach((item, index) => {
                if (item !== possiblePathChunks[index]) {
                    if (possiblePathChunks[index].indexOf(':') === -1) {
                        routeMatch = false;
                    }
                }
            });
            return routeMatch;
        });
    }

    setParams(req, trimmedPath, matchedPath) {
        const trimmedChunks = trimmedPath.split('/');
        const matchedChunks = matchedPath.split('/');
        trimmedChunks.forEach((item, index) => {
            if (item !== matchedChunks[index]) {
                if (matchedChunks[index].indexOf(':') === -1) {
                    throw new Error('Routing error occured');
                }
                const paramName = matchedChunks[index].replace(':', '');
                req.param[paramName] = item;
            }
        });
    }

    dispatch(req) {
        req.param = {};
        if (this.routerMap.hasOwnProperty(req.method)) {
            if (
                Object.keys(this.routerMap[req.method])
                .filter(item => item.indexOf(':') === -1)
                .indexOf(req.trimmedPath) > -1
            ) {
                return this.routerMap[req.method][req.trimmedPath].bind(null);
            } else { 
                const matchedPaths = this.findMatches(
                    Object.keys(this.routerMap[req.method])
                        .filter(item => item.indexOf(':') > -1)
                        .filter(item => item.split('/').length === req.trimmedPath.split('/').length),
                    req.trimmedPath
                );
                console.log(matchedPaths);
                if (matchedPaths.length === 1) {
                    this.setParams(req, req.trimmedPath, matchedPaths[0]);
                    return this.routerMap[req.method][matchedPaths[0]].bind(null);
                } else if (matchedPaths.length > 1) {
                    throw new Error(`Ambiguous routes ${matchedPaths[0]} and ${matchedPaths[1]}`);
                }
            }
        }
        return this.notFound.bind(null);
    }
};
module.exports = handlerObject => new Router(handlerObject);