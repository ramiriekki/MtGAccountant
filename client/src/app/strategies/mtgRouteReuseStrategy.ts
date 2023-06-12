import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy,} from '@angular/router';

export class mtgRouteResuseStrategy implements RouteReuseStrategy {
  private storedRoutes = new Map<string, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    console.log("routeconfigpath", route);
    if (route.routeConfig != null && route.routeConfig.path != undefined){

      return route.routeConfig.path! === "collection/page/:page";
    } else {
      return false;
    }
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (route.routeConfig != null && route.routeConfig.path != null)
    this.storedRoutes.set(route.routeConfig.path, handle);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    if (route.routeConfig != null && route.routeConfig.path != null && this.storedRoutes.get(route.routeConfig.path) != undefined){
      return (
        !!route.routeConfig && !!this.storedRoutes.get(route.routeConfig.path)
      );
    } else return false
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (route.routeConfig != null && route.routeConfig.path != null){
      return this.storedRoutes.get(route.routeConfig.path)!;
    } else {
      return false
    }
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
