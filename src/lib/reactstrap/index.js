import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import {
  Alert as RBAlert,
  Badge as RBBadge,
  Button as RBButton,
  ButtonGroup as RBButtonGroup,
  ButtonToolbar as RBButtonToolbar,
  Card as RBCard,
  CardBody as RBCardBody,
  CardImg as RBCardImg,
  CardText as RBCardText,
  CardTitle as RBCardTitle,
  Carousel as RBCarousel,
  Col as RBCol,
  Collapse as RBCollapse,
  Container as RBContainer,
  InputGroup as RBInputGroup,
  ListGroup as RBListGroup,
  ListGroupItem as RBListGroupItem,
  Nav as RBNav,
  NavItem as RBNavItem,
  NavLink as RBNavLink,
  Navbar as RBNavbar,
  NavbarBrand as RBNavbarBrand,
  NavbarToggle as RBNavbarToggle,
  Row as RBRow,
  Table as RBTable,
} from 'react-bootstrap';

const noop = () => {};

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

const normalizeVariant = (color, fallback = 'secondary') => {
  if (!color) {
    return fallback;
  }

  return color;
};

const buttonColorClass = ({ color, outline }) => {
  const resolvedColor = normalizeVariant(color);
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
    <RBContainer
      as={Tag}
      fluid={fluid}
      className={className}
      {...rest}
    />
  );
};

export const Row = ({ className, noGutters, tag, ...rest }) => {
  const Tag = resolveTag(tag, 'div');
  return <RBRow as={Tag} className={classNames(className, noGutters && 'g-0')} {...rest} />;
};

export const Col = ({ className, tag, widths, ...rest }) => {
  const Tag = resolveTag(tag, 'div');
  const widthClasses = widths ? asArray(widths).map((width) => `col-${width}`) : [];

  return (
    <RBCol
      as={Tag}
      className={classNames(className, widthClasses)}
      {...rest}
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
  const Tag = tag;
  const buttonType = !Tag || Tag === 'button' ? (type || 'button') : type;

  return (
    <RBButton
      ref={ref}
      as={Tag}
      type={buttonType}
      variant={outline ? `outline-${normalizeVariant(color)}` : normalizeVariant(color)}
      size={size}
      active={active}
      className={classNames(className, block && 'd-block w-100')}
      disabled={disabled}
      {...rest}
    >
      {children}
    </RBButton>
  );
});

Button.displayName = 'Button';

export const ButtonGroup = ({ className, vertical, size, children, ...rest }) => (
  <RBButtonGroup
    vertical={vertical}
    size={size}
    className={className}
    {...rest}
  >
    {children}
  </RBButtonGroup>
);

export const ButtonToolbar = ({ className, children, ...rest }) => (
  <RBButtonToolbar className={className} {...rest}>
    {children}
  </RBButtonToolbar>
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

export const Label = ({
  className,
  check,
  size,
  tag,
  children,
  for: legacyFor,
  htmlFor,
  ...rest
}) => {
  const Tag = resolveTag(tag, 'label');
  const resolvedHtmlFor = htmlFor ?? legacyFor;

  return (
    <Tag
      className={classNames(
        className,
        check ? 'form-check-label' : 'form-label',
        size && `col-form-label-${size}`,
      )}
      htmlFor={resolvedHtmlFor}
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
  <RBInputGroup className={className} size={size} {...rest}>
    {children}
  </RBInputGroup>
);

export const InputGroupText = ({ className, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'span');
  return (
    <RBInputGroup.Text as={Tag} className={className} {...rest}>
      {children}
    </RBInputGroup.Text>
  );
};

export const Alert = ({ className, color, isOpen = true, fade, toggle, children, ...rest }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <RBAlert
      className={className}
      variant={normalizeVariant(color, 'warning')}
      dismissible={Boolean(toggle)}
      onClose={toggle}
      transition={fade === false ? false : undefined}
      {...rest}
    >
      {children}
    </RBAlert>
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
    <RBBadge
      as={Tag}
      className={className}
      bg={normalizeVariant(color)}
      pill={pill}
      {...rest}
    >
      {children}
    </RBBadge>
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
    <RBNav
      as={Tag}
      variant={tabs ? 'tabs' : (pills ? 'pills' : undefined)}
      fill={fill}
      justify={justified}
      navbar={navbar}
      className={classNames(
        className,
        vertical && (typeof vertical === 'string' ? `flex-${vertical}-column` : 'flex-column'),
        horizontal === false && 'flex-column',
      )}
      {...rest}
    >
      {children}
    </RBNav>
  );
};

export const NavItem = ({ className, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'li');
  return (
    <RBNavItem as={Tag} className={className} {...rest}>
      {children}
    </RBNavItem>
  );
};

export const NavLink = ({ className, active, disabled, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'a');

  return (
    <RBNavLink
      as={Tag}
      className={className}
      active={active}
      disabled={disabled}
      {...rest}
    >
      {children}
    </RBNavLink>
  );
};

export const Navbar = ({ className, color, dark, light, expand, fixed, sticky, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'nav');

  return (
    <RBNavbar
      as={Tag}
      className={className}
      expand={expand}
      fixed={fixed}
      sticky={sticky}
      bg={color}
      variant={dark ? 'dark' : (light ? 'light' : undefined)}
      {...rest}
    >
      {children}
    </RBNavbar>
  );
};

export const NavbarBrand = ({ className, tag, children, ...rest }) => {
  const Tag = tag;
  return (
    <RBNavbarBrand as={Tag} className={className} {...rest}>
      {children}
    </RBNavbarBrand>
  );
};

export const NavbarToggler = ({ className, children, ...rest }) => (
  <RBNavbarToggle className={className} {...rest}>
    {children || <span className="navbar-toggler-icon" />}
  </RBNavbarToggle>
);

export const Collapse = ({ className, isOpen, navbar, horizontal, children, ...rest }) => (
  <RBCollapse in={Boolean(isOpen)} dimension={horizontal ? 'width' : 'height'}>
    <div
      className={classNames(className, navbar && 'navbar-collapse', horizontal && 'collapse-horizontal')}
      {...rest}
    >
      {children}
    </div>
  </RBCollapse>
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
  return (
    <RBTable
      className={className}
      bordered={bordered}
      borderless={borderless}
      striped={striped}
      variant={dark ? 'dark' : undefined}
      hover={hover}
      responsive={responsive}
      size={size}
      {...rest}
    >
      {children}
    </RBTable>
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
    <RBCard
      as={Tag}
      className={className}
      body={body}
      bg={color && !outline ? normalizeVariant(color) : undefined}
      border={outline ? normalizeVariant(color) : undefined}
      text={inverse ? 'white' : undefined}
      {...rest}
    >
      {children}
    </RBCard>
  );
};

export const CardBody = ({ className, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'div');
  return (
    <RBCardBody as={Tag} className={className} {...rest}>
      {children}
    </RBCardBody>
  );
};

export const CardTitle = ({ className, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'h5');
  return (
    <RBCardTitle as={Tag} className={className} {...rest}>
      {children}
    </RBCardTitle>
  );
};

export const CardText = ({ className, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, 'p');
  return (
    <RBCardText as={Tag} className={className} {...rest}>
      {children}
    </RBCardText>
  );
};

export const CardImg = ({ className, top, bottom, ...rest }) => (
  <RBCardImg className={className} variant={top ? 'top' : (bottom ? 'bottom' : undefined)} {...rest} />
);

export const ListGroup = ({ className, flush, horizontal, numbered, children, tag, ...rest }) => {
  const Tag = resolveTag(tag, numbered ? 'ol' : 'ul');

  return (
    <RBListGroup
      as={Tag}
      className={className}
      flush={flush}
      horizontal={horizontal}
      numbered={numbered}
      {...rest}
    >
      {children}
    </RBListGroup>
  );
};

export const ListGroupItem = ({ className, active, disabled, color, action, tag, children, ...rest }) => {
  const Tag = resolveTag(tag, action ? 'button' : 'li');

  return (
    <RBListGroupItem
      as={Tag}
      action={action}
      active={active}
      disabled={disabled}
      variant={color ? normalizeVariant(color) : undefined}
      className={className}
      type={Tag === 'button' ? 'button' : undefined}
      {...rest}
    >
      {children}
    </RBListGroupItem>
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
  if (items.length === 0) {
    return null;
  }

  return (
    <RBCarousel
      className={className}
      indicators={indicators}
      controls={controls}
      interval={autoPlay ? interval : null}
    >
      {items.map((item, index) => (
        <RBCarousel.Item key={item.key || item.src || index}>
          <img className="d-block w-100" src={item.src} alt={item.altText || item.caption || `Slide ${index + 1}`} />
          {(item.header || item.caption) ? (
            <RBCarousel.Caption>
              {item.header ? <h5>{item.header}</h5> : null}
              {item.caption ? <p>{item.caption}</p> : null}
            </RBCarousel.Caption>
          ) : null}
        </RBCarousel.Item>
      ))}
    </RBCarousel>
  );
};
