import React from "react";

const HotKeysContext = React.createContext({
  hotKeyParent: null,
  hotKeyMap: {}
});

export const withHotKeys = Component => {
  const WrappedComponent = props => (
    <HotKeysContext.Consumer>
      {value => <Component context={value} {...props} />}
    </HotKeysContext.Consumer>
  );

  WrappedComponent.displayName = `HotKeys-${Component.displayName}`;
  return WrappedComponent;
};

export const HotKeysProvider = HotKeysContext.Provider;
