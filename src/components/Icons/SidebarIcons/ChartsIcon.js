import React from 'react';

class ChartsIcon extends React.Component {

    render() {
        return (
          <svg className={this.props.className} width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M17.3511 11.7146C16.9153 11.5596 16.4403 11.7871 16.2878 12.2221C15.3478 14.8805 12.8203 16.6663 10.0003 16.6663C6.32443 16.6663 3.3336 13.6763 3.3336 9.99962C3.3336 7.17962 5.11943 4.65212 7.77776 3.71212C8.21193 3.55962 8.43943 3.08379 8.2861 2.64962C8.13276 2.21629 7.65693 1.98796 7.22276 2.14212C3.89943 3.31629 1.66693 6.47379 1.66693 9.99962C1.66693 14.5946 5.40526 18.333 10.0003 18.333C13.5261 18.333 16.6836 16.1013 17.8586 12.7771C18.0119 12.3438 17.7853 11.868 17.3511 11.7146ZM11.6667 8.3333V3.39246C14.2175 3.75913 16.2408 5.78163 16.6075 8.3333H11.6667ZM10.8333 1.66663C10.3733 1.66663 10 2.03913 10 2.49996V9.16663C10 9.62746 10.3733 9.99996 10.8333 9.99996H17.5C17.96 9.99996 18.3333 9.62746 18.3333 9.16663C18.3333 5.03079 14.9683 1.66663 10.8333 1.66663Z" />
            <mask id="charts" mask-type="alpha" maskUnits="userSpaceOnUse" x="1" y="1" width="18" height="18">
              <path fillRule="evenodd" clipRule="evenodd" d="M17.3511 11.7146C16.9153 11.5596 16.4403 11.7871 16.2878 12.2221C15.3478 14.8805 12.8203 16.6663 10.0003 16.6663C6.32443 16.6663 3.3336 13.6763 3.3336 9.99962C3.3336 7.17962 5.11943 4.65212 7.77776 3.71212C8.21193 3.55962 8.43943 3.08379 8.2861 2.64962C8.13276 2.21629 7.65693 1.98796 7.22276 2.14212C3.89943 3.31629 1.66693 6.47379 1.66693 9.99962C1.66693 14.5946 5.40526 18.333 10.0003 18.333C13.5261 18.333 16.6836 16.1013 17.8586 12.7771C18.0119 12.3438 17.7853 11.868 17.3511 11.7146ZM11.6667 8.3333V3.39246C14.2175 3.75913 16.2408 5.78163 16.6075 8.3333H11.6667ZM10.8333 1.66663C10.3733 1.66663 10 2.03913 10 2.49996V9.16663C10 9.62746 10.3733 9.99996 10.8333 9.99996H17.5C17.96 9.99996 18.3333 9.62746 18.3333 9.16663C18.3333 5.03079 14.9683 1.66663 10.8333 1.66663Z" />
            </mask>
            <g mask="url(#charts)">
              <rect width="20" height="20" />
            </g>
          </svg>
        );
    }
}

export default ChartsIcon;
