import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

const BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const noop = () => {};

const isNumberLike = (value) => {
  if (typeof value === 'number') {
    return true;
  }

  if (typeof value !== 'string') {
    return false;
  }

  return /^\d+(\.\d+)?$/.test(value.trim());
};

const asArray = (value) => (Array.isArray(value) ? value : [value]);

const resolveTag = (tag, fallback) => tag || fallback;

const resolveTarget = (target) => {
  if (typeof document === 'undefined') {
    return null;
  }

  if (!target) {
    return null;
  }

  if (typeof target === 'function') {
    return target() || null;
  }

  if (typeof target === 'string') {
    return document.getElementById(target);
  }

  return target;
};

const colorClass = (prefix, color) => (color ? `${prefix}-${color}` : null);

const buttonColorClass = ({ color, outline }) => {
  const resolvedColor = color || 'secondary';
  return outline ? `btn-outline-${resolvedColor}` : `btn-${resolvedColor}`;
};

const toPercent = (value, max = 100) => {
  const numericValue = Number(value || 0);
  const numericMax = Number(max || 100);

  if (!Number.isFinite(numericValue) || !Number.isFinite(numericMax) || numericMax === 0) {
    return 0;
  }

  return Math.max(0, Math.min(100, (numericValue / numericMax) * 100));
};

const useControlledState = (controlledValue, defaultValue = false) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = typeof controlledValue === 'boolean';

  return {
    value: isControlled ? controlledValue : internalValue,
    setValue: setInternalValue,
    isControlled,
  };
};

const useBodyClass = (active, className) => {
  useEffect(() => {
    if (!active || typeof document === 'undefined') {
      return undefined;
    }

    document.body.classList.add(className);
    return () => {
      document.body.classList.remove(className);
    };
  }, [active, className]);
};

export const Container = ({ fluid, className, tag, ...rest }) => {
  const Tag = resolveTag(tag, 'div');

  return (
    <Tag
      className={classNames(className, fluid ? (typeof fluid === 'string' ? `container-${fluid}` : 'container-fluid') : 'container')}
      {...rest}
    />
  );
};

export const Row = ({ className, noGutters, tag, ...rest }) => {
  const Tag = resolveTag(tag, 'div');
  return <Tag className={classNames(className, 'row', noGutters && 'g-0')} {...rest} />;
};

const buildColClasses = (props) => {
  const classes = [];

  BREAKPOINTS.forEach((bp) => {
    const value = props[bp];

    if (value == null) {
      return;
    }

    const prefix = bp === 'xs' ? 'col' : `col-${bp}`;

    if (value === true || value === '') {
      classes.push(prefix);
      return;
    }

    if (isNumberLike(value)) {
      classes.push(`${prefix}-${value}`);
      return;
    }

    if (typeof value === 'object') {
      const size = value.size;
      const offset = value.offset;
      const order = value.order;

      if (size === true || size === '') {
        classes.push(prefix);
      } else if (size != null) {
        classes.push(`${prefix}-${size}`);
      }

      if (offset != null) {
        classes.push(bp === 'xs' ? `offset-${offset}` : `offset-${bp}-${offset}`);
      }

      if (order != null) {
        classes.push(bp === 'xs' ? `order-${order}` : `order-${bp}-${order}`);
      }
    }
  });

  return classes;
};

export const Col = ({ className, tag, widths, ...rest }) => {
  const Tag = resolveTag(tag, 'div');
  const colClasses = buildColClasses(rest);

  if (widths) {
    asArray(widths).forEach((width) => {
      colClasses.push(`col-${width}`);
    });
  }

  const {
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    ...htmlProps
  } = rest;

  return (
    <Tag
      className={classNames(className, colClasses.length > 0 ? colClasses : 'col')}
      {...htmlProps}
    />
  );
};

export const Button = forwardRef(({
  className,
  color,
  outline,
  size,
  block,
  active,
  disabled,
  tag,
  type,
  children,
  ...rest
}, ref) => {
  const Tag = resolveTag(tag, 'button');
  const buttonType = Tag === 'button' ? (type || 'button') : type;

  return (
    <Tag
      ref={ref}
      type={buttonType}
      className={classNames(
        className,
        'btn',
        buttonColorClass({ color, outline }),
        size && `btn-${size}`,
        block && 'd-block w-100',
        active && 'active',
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </Tag>
  );
});

Button.displayName = 'Button';

export const ButtonGroup = ({ className, vertical, size, children, ...rest }) => (
  <div
    className={classNames(className, vertical ? 'btn-group-vertical' : 'btn-group', size && `btn-group-${size}`)}
    role="group"
    {...rest}
  >
    {children}
  </div>
);

export const ButtonToolbar = ({ className, children, ...rest }) => (
  <div className={classNames(className, 'btn-toolbar')} role="toolbar" {...rest}>
    {children}
  </div>
);

export const Form = ({ className, inline, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'form');
  return (
    <Tag className={classNames(className, inline && 'row row-cols-lg-auto align-items-center')} {...rest}>
      {children}
    </Tag>
  );
};

export const FormGroup = ({ className, row, check, switch: formSwitch, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'div');
  return (
    <Tag
      className={classNames(
        className,
        row ? 'row' : 'mb-3',
        check && 'form-check',
        formSwitch && 'form-switch',
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const Label = ({ className, check, size, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'label');

  return (
    <Tag
      className={classNames(
        className,
        check ? 'form-check-label' : 'form-label',
        size && `col-form-label-${size}`,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const Input = forwardRef(({
  className,
  type,
  bsSize,
  size,
  plaintext,
  valid,
  invalid,
  tag,
  children,
  innerRef,
  ...rest
}, ref) => {
  const resolvedType = type || 'text';
  const resolvedSize = size || bsSize;
  const assignedRef = innerRef || ref;

  const commonClassName = classNames(
    className,
    valid && 'is-valid',
    invalid && 'is-invalid',
  );

  if (resolvedType === 'textarea' || tag === 'textarea') {
    return (
      <textarea
        ref={assignedRef}
        className={classNames(commonClassName, plaintext ? 'form-control-plaintext' : 'form-control', resolvedSize && `form-control-${resolvedSize}`)}
        {...rest}
      >
        {children}
      </textarea>
    );
  }

  if (resolvedType === 'select' || tag === 'select') {
    return (
      <select
        ref={assignedRef}
        className={classNames(commonClassName, 'form-select', resolvedSize && `form-select-${resolvedSize}`)}
        {...rest}
      >
        {children}
      </select>
    );
  }

  if (resolvedType === 'checkbox' || resolvedType === 'radio') {
    return (
      <input
        ref={assignedRef}
        type={resolvedType}
        className={classNames(commonClassName, 'form-check-input')}
        {...rest}
      />
    );
  }

  if (resolvedType === 'range') {
    return <input ref={assignedRef} type="range" className={classNames(commonClassName, 'form-range')} {...rest} />;
  }

  const Tag = resolveTag(tag, 'input');

  return (
    <Tag
      ref={assignedRef}
      type={Tag === 'input' ? resolvedType : undefined}
      className={classNames(
        commonClassName,
        plaintext ? 'form-control-plaintext' : 'form-control',
        resolvedSize && `form-control-${resolvedSize}`,
      )}
      {...rest}
    >
      {Tag === 'input' ? undefined : children}
    </Tag>
  );
});

Input.displayName = 'Input';

export const InputGroup = ({ className, size, children, ...rest }) => (
  <div className={classNames(className, 'input-group', size && `input-group-${size}`)} {...rest}>
    {children}
  </div>
);

export const InputGroupText = ({ className, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'span');
  return (
    <Tag className={classNames(className, 'input-group-text')} {...rest}>
      {children}
    </Tag>
  );
};

export const Alert = ({ className, color, isOpen = true, fade, toggle, children, ...rest }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={classNames(className, 'alert', colorClass('alert', color || 'warning'), fade !== false && 'fade show')} role="alert" {...rest}>
      {toggle ? (
        <button type="button" className="btn-close" aria-label="Close" onClick={toggle} />
      ) : null}
      {children}
    </div>
  );
};

export const UncontrolledAlert = ({ toggle, ...props }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Alert
      {...props}
      isOpen={isOpen}
      toggle={() => {
        setIsOpen(false);
        if (toggle) {
          toggle();
        }
      }}
    />
  );
};

export const Badge = ({ className, color, pill, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'span');

  return (
    <Tag
      className={classNames(className, 'badge', colorClass('text-bg', color || 'secondary'), pill && 'rounded-pill')}
      {...rest}
    >
      {children}
    </Tag>
  );
};

const TabContext = createContext({ activeTab: null });

export const TabContent = ({ className, activeTab, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'div');

  return (
    <TabContext.Provider value={{ activeTab }}>
      <Tag className={classNames(className, 'tab-content')} {...rest}>
        {children}
      </Tag>
    </TabContext.Provider>
  );
};

export const TabPane = ({ className, tabId, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'div');
  const { activeTab } = useContext(TabContext);
  const isActive = String(activeTab) === String(tabId);

  return (
    <Tag
      className={classNames(className, 'tab-pane', isActive && 'active show')}
      style={isActive ? undefined : { display: 'none' }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const Nav = ({ className, tabs, pills, vertical, horizontal, justified, fill, navbar, children, tag, ...rest }) => {
  const Tag = resolveTag(tag, 'ul');
  return (
    <Tag
      className={classNames(
        className,
        'nav',
        tabs && 'nav-tabs',
        pills && 'nav-pills',
        vertical && (typeof vertical === 'string' ? `flex-${vertical}-column` : 'flex-column'),
        horizontal === false && 'flex-column',
        justified && 'nav-justified',
        fill && 'nav-fill',
        navbar && 'navbar-nav',
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const NavItem = ({ className, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'li');
  return (
    <Tag className={classNames(className, 'nav-item')} {...rest}>
      {children}
    </Tag>
  );
};

export const NavLink = ({ className, active, disabled, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'a');

  return (
    <Tag
      className={classNames(className, 'nav-link', active && 'active', disabled && 'disabled')}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const Navbar = ({ className, color, dark, light, expand, fixed, sticky, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'nav');
  const expandClass = expand
    ? (expand === true ? 'navbar-expand' : `navbar-expand-${expand}`)
    : null;

  return (
    <Tag
      className={classNames(
        className,
        'navbar',
        expandClass,
        dark && 'navbar-dark',
        light && 'navbar-light',
        color && `bg-${color}`,
        fixed && `fixed-${fixed}`,
        sticky && `sticky-${sticky}`,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const NavbarBrand = ({ className, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'a');
  return (
    <Tag className={classNames(className, 'navbar-brand')} {...rest}>
      {children}
    </Tag>
  );
};

export const NavbarToggler = ({ className, children, ...rest }) => (
  <button type="button" className={classNames(className, 'navbar-toggler')} {...rest}>
    {children || <span className="navbar-toggler-icon" />}
  </button>
);

export const Collapse = ({ className, isOpen, navbar, horizontal, children, ...rest }) => (
  <div
    className={classNames(className, 'collapse', isOpen && 'show', navbar && 'navbar-collapse', horizontal && 'collapse-horizontal')}
    {...rest}
  >
    {children}
  </div>
);

const DropdownContext = createContext(null);

const DropdownBase = ({
  className,
  isOpen,
  toggle,
  nav,
  inNavbar,
  direction,
  group,
  children,
  tag,
  ...rest
}) => {
  const { value: internalOpen, setValue: setInternalOpen, isControlled } = useControlledState(isOpen, false);
  const open = internalOpen;

  const toggleOpen = useCallback((event) => {
    if (toggle) {
      toggle(event);
    }
    if (!isControlled) {
      setInternalOpen((prev) => !prev);
    }
  }, [toggle, isControlled, setInternalOpen]);

  const close = useCallback((event) => {
    if (!open) {
      return;
    }

    if (toggle) {
      toggle(event);
    }

    if (!isControlled) {
      setInternalOpen(false);
    }
  }, [open, toggle, isControlled, setInternalOpen]);

  const Tag = resolveTag(tag, 'div');

  return (
    <DropdownContext.Provider value={{ isOpen: open, toggle: toggleOpen, close, inNavbar, group, nav }}>
      <Tag
        className={classNames(
          className,
          nav ? 'nav-item dropdown' : group ? 'btn-group' : 'dropdown',
          direction === 'up' && 'dropup',
          direction === 'start' && 'dropstart',
          direction === 'end' && 'dropend',
          open && 'show',
        )}
        {...rest}
      >
        {children}
      </Tag>
    </DropdownContext.Provider>
  );
};

export const Dropdown = (props) => <DropdownBase {...props} />;

export const ButtonDropdown = (props) => <DropdownBase {...props} group />;

export const UncontrolledDropdown = ({ defaultOpen = false, ...props }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return <DropdownBase {...props} isOpen={isOpen} toggle={() => setIsOpen((prev) => !prev)} />;
};

export const UncontrolledButtonDropdown = ({ defaultOpen = false, ...props }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return <ButtonDropdown {...props} isOpen={isOpen} toggle={() => setIsOpen((prev) => !prev)} />;
};

export const DropdownToggle = ({
  className,
  color,
  caret,
  split,
  nav,
  tag,
  onClick,
  children,
  ...rest
}) => {
  const ctx = useContext(DropdownContext);
  const Tag = resolveTag(tag, nav ? 'a' : 'button');

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }

    if (!event.defaultPrevented && ctx) {
      ctx.toggle(event);
    }
  };

  const isButton = Tag === 'button';

  return (
    <Tag
      type={isButton ? 'button' : undefined}
      className={classNames(
        className,
        nav ? 'nav-link dropdown-toggle' : 'dropdown-toggle',
        !nav && 'btn',
        !nav && buttonColorClass({ color }),
        split && 'dropdown-toggle-split',
        caret && 'dropdown-toggle',
        ctx?.isOpen && 'show',
      )}
      aria-expanded={ctx?.isOpen || false}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const DropdownMenu = ({ className, end, right, tag, children, ...rest }) => {
  const ctx = useContext(DropdownContext);
  const Tag = resolveTag(tag, 'div');

  return (
    <Tag
      className={classNames(
        className,
        'dropdown-menu',
        (end || right) && 'dropdown-menu-end',
        ctx?.isOpen && 'show',
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const DropdownItem = ({
  className,
  active,
  disabled,
  divider,
  header,
  toggle = true,
  tag,
  onClick,
  children,
  ...rest
}) => {
  const ctx = useContext(DropdownContext);

  if (divider) {
    return <div className={classNames(className, 'dropdown-divider')} {...rest} />;
  }

  if (header) {
    return (
      <h6 className={classNames(className, 'dropdown-header')} {...rest}>
        {children}
      </h6>
    );
  }

  const Tag = resolveTag(tag, 'button');

  return (
    <Tag
      type={Tag === 'button' ? 'button' : undefined}
      className={classNames(className, 'dropdown-item', active && 'active', disabled && 'disabled')}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
          return;
        }

        if (onClick) {
          onClick(event);
        }

        if (toggle && ctx) {
          ctx.close(event);
        }
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const Table = ({ className, bordered, borderless, striped, dark, hover, responsive, size, children, ...rest }) => {
  const table = (
    <table
      className={classNames(
        className,
        'table',
        bordered && 'table-bordered',
        borderless && 'table-borderless',
        striped && 'table-striped',
        dark && 'table-dark',
        hover && 'table-hover',
        size && `table-${size}`,
      )}
      {...rest}
    >
      {children}
    </table>
  );

  if (!responsive) {
    return table;
  }

  return (
    <div className={classNames(responsive === true ? 'table-responsive' : `table-responsive-${responsive}`)}>
      {table}
    </div>
  );
};

export const Progress = ({
  className,
  value = 0,
  max = 100,
  color,
  striped,
  animated,
  bar,
  multi,
  children,
  ...rest
}) => {
  if (bar) {
    return (
      <div
        className={classNames(
          className,
          'progress-bar',
          colorClass('bg', color),
          striped && 'progress-bar-striped',
          animated && 'progress-bar-animated',
        )}
        role="progressbar"
        style={{ width: `${toPercent(value, max)}%` }}
        aria-valuenow={Number(value) || 0}
        aria-valuemin={0}
        aria-valuemax={Number(max) || 100}
        {...rest}
      >
        {children}
      </div>
    );
  }

  return (
    <div className={classNames(className, 'progress')} {...rest}>
      {multi ? children : (
        <Progress bar value={value} max={max} color={color} striped={striped} animated={animated}>
          {children}
        </Progress>
      )}
    </div>
  );
};

export const Card = ({ className, body, color, inverse, outline, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'div');
  return (
    <Tag
      className={classNames(
        className,
        'card',
        body && 'card-body',
        color && (outline ? `border-${color}` : colorClass('bg', color)),
        inverse && 'text-white',
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const CardBody = ({ className, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'div');
  return (
    <Tag className={classNames(className, 'card-body')} {...rest}>
      {children}
    </Tag>
  );
};

export const CardTitle = ({ className, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'h5');
  return (
    <Tag className={classNames(className, 'card-title')} {...rest}>
      {children}
    </Tag>
  );
};

export const CardText = ({ className, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'p');
  return (
    <Tag className={classNames(className, 'card-text')} {...rest}>
      {children}
    </Tag>
  );
};

export const CardImg = ({ className, top, bottom, ...rest }) => (
  <img
    className={classNames(className, top && 'card-img-top', bottom && 'card-img-bottom', !top && !bottom && 'card-img')}
    {...rest}
  />
);

export const ListGroup = ({ className, flush, horizontal, numbered, children, tag, ...rest }) => {
  const Tag = resolveTag(tag, numbered ? 'ol' : 'ul');

  return (
    <Tag
      className={classNames(
        className,
        'list-group',
        flush && 'list-group-flush',
        horizontal && (typeof horizontal === 'string' ? `list-group-horizontal-${horizontal}` : 'list-group-horizontal'),
        numbered && 'list-group-numbered',
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const ListGroupItem = ({ className, active, disabled, color, action, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, action ? 'button' : 'li');

  return (
    <Tag
      type={Tag === 'button' ? 'button' : undefined}
      className={classNames(
        className,
        'list-group-item',
        action && 'list-group-item-action',
        active && 'active',
        disabled && 'disabled',
        color && `list-group-item-${color}`,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const Breadcrumb = ({ className, tag, listTag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'nav');
  const ListTag = resolveTag(listTag, 'ol');

  return (
    <Tag className={classNames(className)} aria-label="breadcrumb" {...rest}>
      <ListTag className="breadcrumb">
        {children}
      </ListTag>
    </Tag>
  );
};

export const BreadcrumbItem = ({ className, active, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'li');

  return (
    <Tag className={classNames(className, 'breadcrumb-item', active && 'active')} aria-current={active ? 'page' : undefined} {...rest}>
      {children}
    </Tag>
  );
};

export const Pagination = ({ className, size, children, tag, ...rest }) => {
  const Tag = resolveTag(tag, 'ul');
  return (
    <Tag className={classNames(className, 'pagination', size && `pagination-${size}`)} {...rest}>
      {children}
    </Tag>
  );
};

export const PaginationItem = ({ className, active, disabled, children, tag, ...rest }) => {
  const Tag = resolveTag(tag, 'li');
  return (
    <Tag className={classNames(className, 'page-item', active && 'active', disabled && 'disabled')} {...rest}>
      {children}
    </Tag>
  );
};

export const PaginationLink = ({ className, children, tag, ...rest }) => {
  const Tag = resolveTag(tag, 'a');
  return (
    <Tag className={classNames(className, 'page-link')} {...rest}>
      {children}
    </Tag>
  );
};

const ModalContext = createContext({ toggle: noop });

export const Modal = ({
  className,
  isOpen,
  toggle,
  backdrop = true,
  centered,
  scrollable,
  size,
  fullscreen,
  modalClassName,
  contentClassName,
  wrapClassName,
  children,
  ...rest
}) => {
  useBodyClass(Boolean(isOpen), 'modal-open');

  if (!isOpen || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <>
      <div className={classNames('modal', 'fade', 'show', 'd-block', wrapClassName)} tabIndex={-1} role="dialog" onClick={(event) => {
        if (event.target !== event.currentTarget) {
          return;
        }
        if (backdrop === true && toggle) {
          toggle(event);
        }
      }}>
        <div
          className={classNames(
            className,
            'modal-dialog',
            centered && 'modal-dialog-centered',
            scrollable && 'modal-dialog-scrollable',
            size && `modal-${size}`,
            fullscreen && (fullscreen === true ? 'modal-fullscreen' : `modal-fullscreen-${fullscreen}`),
          )}
          role="document"
        >
          <ModalContext.Provider value={{ toggle }}>
            <div className={classNames('modal-content', modalClassName, contentClassName)} {...rest}>
              {children}
            </div>
          </ModalContext.Provider>
        </div>
      </div>
      {backdrop !== false ? <div className="modal-backdrop fade show" /> : null}
    </>,
    document.body,
  );
};

export const ModalHeader = ({ className, toggle, close, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'div');
  const context = useContext(ModalContext);
  const onClose = toggle || context.toggle;

  return (
    <Tag className={classNames(className, 'modal-header')} {...rest}>
      <h5 className="modal-title">{children}</h5>
      {close || (onClose ? <button type="button" className="btn-close" aria-label="Close" onClick={onClose} /> : null)}
    </Tag>
  );
};

export const ModalBody = ({ className, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'div');
  return (
    <Tag className={classNames(className, 'modal-body')} {...rest}>
      {children}
    </Tag>
  );
};

export const ModalFooter = ({ className, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'div');
  return (
    <Tag className={classNames(className, 'modal-footer')} {...rest}>
      {children}
    </Tag>
  );
};

const getOverlayPlacement = (placement) => {
  if (!placement) {
    return 'top';
  }

  if (placement.includes('bottom')) {
    return 'bottom';
  }

  if (placement.includes('left')) {
    return 'left';
  }

  if (placement.includes('right')) {
    return 'right';
  }

  return 'top';
};

const useOverlayPosition = ({ isOpen, target, placement }) => {
  const overlayRef = useRef(null);
  const [position, setPosition] = useState({ top: -9999, left: -9999, visibility: 'hidden' });

  const updatePosition = useCallback(() => {
    const targetElement = resolveTarget(target);
    const overlayElement = overlayRef.current;

    if (!targetElement || !overlayElement) {
      return;
    }

    const targetRect = targetElement.getBoundingClientRect();
    const overlayRect = overlayElement.getBoundingClientRect();

    const scrollX = window.pageXOffset;
    const scrollY = window.pageYOffset;
    const basePlacement = getOverlayPlacement(placement);

    let top = 0;
    let left = 0;

    if (basePlacement === 'bottom') {
      top = targetRect.bottom + scrollY + 8;
      left = targetRect.left + scrollX + (targetRect.width - overlayRect.width) / 2;
    } else if (basePlacement === 'left') {
      top = targetRect.top + scrollY + (targetRect.height - overlayRect.height) / 2;
      left = targetRect.left + scrollX - overlayRect.width - 8;
    } else if (basePlacement === 'right') {
      top = targetRect.top + scrollY + (targetRect.height - overlayRect.height) / 2;
      left = targetRect.right + scrollX + 8;
    } else {
      top = targetRect.top + scrollY - overlayRect.height - 8;
      left = targetRect.left + scrollX + (targetRect.width - overlayRect.width) / 2;
    }

    setPosition({
      top,
      left,
      visibility: 'visible',
    });
  }, [placement, target]);

  useLayoutEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const rafId = window.requestAnimationFrame(updatePosition);

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen, updatePosition]);

  return { overlayRef, position };
};

export const Tooltip = ({ className, isOpen, target, placement = 'top', children, ...rest }) => {
  const { overlayRef, position } = useOverlayPosition({ isOpen, target, placement });

  if (!isOpen || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      ref={overlayRef}
      role="tooltip"
      className={classNames(className, 'tooltip', `bs-tooltip-${getOverlayPlacement(placement)}`, 'show')}
      style={{ position: 'absolute', top: position.top, left: position.left, visibility: position.visibility, zIndex: 1080 }}
      {...rest}
    >
      <div className="tooltip-arrow" />
      <div className="tooltip-inner">{children}</div>
    </div>,
    document.body,
  );
};

export const UncontrolledTooltip = ({ target, trigger = 'hover focus', ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const targetElement = resolveTarget(target);
    if (!targetElement) {
      return undefined;
    }

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    if (trigger.includes('hover')) {
      targetElement.addEventListener('mouseenter', open);
      targetElement.addEventListener('mouseleave', close);
    }

    if (trigger.includes('focus')) {
      targetElement.addEventListener('focus', open);
      targetElement.addEventListener('blur', close);
    }

    return () => {
      targetElement.removeEventListener('mouseenter', open);
      targetElement.removeEventListener('mouseleave', close);
      targetElement.removeEventListener('focus', open);
      targetElement.removeEventListener('blur', close);
    };
  }, [target, trigger]);

  return <Tooltip {...props} target={target} isOpen={isOpen} />;
};

export const Popover = ({ className, isOpen, target, placement = 'top', children, ...rest }) => {
  const { overlayRef, position } = useOverlayPosition({ isOpen, target, placement });

  if (!isOpen || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      ref={overlayRef}
      className={classNames(className, 'popover', `bs-popover-${getOverlayPlacement(placement)}`, 'show')}
      style={{ position: 'absolute', top: position.top, left: position.left, visibility: position.visibility, zIndex: 1080 }}
      {...rest}
    >
      <div className="popover-arrow" />
      {children}
    </div>,
    document.body,
  );
};

export const PopoverHeader = ({ className, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'h3');
  return (
    <Tag className={classNames(className, 'popover-header')} {...rest}>
      {children}
    </Tag>
  );
};

export const PopoverBody = ({ className, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'div');
  return (
    <Tag className={classNames(className, 'popover-body')} {...rest}>
      {children}
    </Tag>
  );
};

export const UncontrolledCarousel = ({ className, items = [], indicators = true, controls = true, autoPlay = true, interval = 5000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const itemCount = items.length;

  useEffect(() => {
    if (!autoPlay || itemCount < 2) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % itemCount);
    }, interval);

    return () => {
      window.clearInterval(timer);
    };
  }, [autoPlay, itemCount, interval]);

  if (itemCount === 0) {
    return null;
  }

  const goTo = (index) => {
    setActiveIndex((index + itemCount) % itemCount);
  };

  return (
    <div className={classNames(className, 'carousel slide')}>
      {indicators ? (
        <div className="carousel-indicators">
          {items.map((item, index) => (
            <button
              key={item.key || item.src || index}
              type="button"
              className={classNames(index === activeIndex && 'active')}
              aria-current={index === activeIndex || undefined}
              aria-label={`Slide ${index + 1}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      ) : null}
      <div className="carousel-inner">
        {items.map((item, index) => (
          <div key={item.key || item.src || index} className={classNames('carousel-item', index === activeIndex && 'active')}>
            <img className="d-block w-100" src={item.src} alt={item.altText || item.caption || `Slide ${index + 1}`} />
            {(item.header || item.caption) ? (
              <div className="carousel-caption d-none d-md-block">
                {item.header ? <h5>{item.header}</h5> : null}
                {item.caption ? <p>{item.caption}</p> : null}
              </div>
            ) : null}
          </div>
        ))}
      </div>
      {controls ? (
        <>
          <button className="carousel-control-prev" type="button" onClick={() => goTo(activeIndex - 1)}>
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" onClick={() => goTo(activeIndex + 1)}>
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </>
      ) : null}
    </div>
  );
};
