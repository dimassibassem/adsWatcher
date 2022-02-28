import React from 'react';
import NarrowSidebar from "./NarrowSidebar";
import MobileMenu from "./MobileMenu";
import ContentArea from "./ContentArea";

const All = ({navigation,mobileMenuOpen,setMobileMenuOpen,userNavigation,currentFile,files,tabs}) => {
    return (
        <div className="h-full flex">
            {/* Narrow sidebar */}
            <NarrowSidebar navs={navigation}/>
            {/* Mobile menu */}
            <MobileMenu navs={navigation} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}/>

            {/* Content area */}
            <ContentArea setMobileMenuOpen={setMobileMenuOpen} userNavigation={userNavigation}
                         currentFile={currentFile} files={files} tabs={tabs}/>

        </div>
    );
};

export default All;
