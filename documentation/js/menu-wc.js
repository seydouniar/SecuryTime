'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">secury-time documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-b0cd784ec6cda480ce2378f4a10eac61"' : 'data-target="#xs-components-links-module-AppModule-b0cd784ec6cda480ce2378f4a10eac61"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-b0cd784ec6cda480ce2378f4a10eac61"' :
                                            'id="xs-components-links-module-AppModule-b0cd784ec6cda480ce2378f4a10eac61"' }>
                                            <li class="link">
                                                <a href="components/AgencesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AgencesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AgentDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AgentDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AgentListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AgentListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AgentPlanningComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AgentPlanningComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AuthComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DevisComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DevisComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogEventEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DialogEventEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogEventSelectComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DialogEventSelectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FacturationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FacturationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InterventionsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InterventionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewAgentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewAgentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewClientComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewClientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewCompteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewCompteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewSiteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewSiteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlanningComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlanningComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlanningHomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlanningHomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PriseServiceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PriseServiceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SiteListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SiteListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SitePlanningComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SitePlanningComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-b0cd784ec6cda480ce2378f4a10eac61"' : 'data-target="#xs-injectables-links-module-AppModule-b0cd784ec6cda480ce2378f4a10eac61"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-b0cd784ec6cda480ce2378f4a10eac61"' :
                                        'id="xs-injectables-links-module-AppModule-b0cd784ec6cda480ce2378f4a10eac61"' }>
                                        <li class="link">
                                            <a href="injectables/AgentServices.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AgentServices</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EventServices.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>EventServices</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/Event.html" data-type="entity-link">Event</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/GuardService.html" data-type="entity-link">GuardService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Agent.html" data-type="entity-link">Agent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AgentReponse.html" data-type="entity-link">AgentReponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Client.html" data-type="entity-link">Client</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClientResponse.html" data-type="entity-link">ClientResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Site.html" data-type="entity-link">Site</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SiteReponse.html" data-type="entity-link">SiteReponse</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});