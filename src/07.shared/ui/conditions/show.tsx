import { Children } from "react";

interface IShowProps {
  children: React.ReactNode;
}

const Show = ({ children }: IShowProps) => {
  let whenComponent = null;
  let elseComponents = null;

  Children.forEach(children, (child: any) => {
    if (child.props.isTrue === undefined) {
      elseComponents = child;
    } else if (!whenComponent && child.props.isTrue) {
      whenComponent = child;
    }
  });
  return whenComponent || elseComponents;
};

Show.When = ({ isTrue, children }) => isTrue && children;
Show.Else = ({ children }) => children;

export default Show;
