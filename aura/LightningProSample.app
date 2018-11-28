<aura:application extends="force:slds">
    <!--Attribute Section -->
    <aura:attribute name="colMap" type="List" access="public" description="Used to Store a column Definition" />
    <aura:attribute name="rows" type="List" default="[]" access="public" description="Used to Store a Data Rows" />
    <aura:attribute name="columnConfig" type="Map" access="public" description="Used to Store a column configuration"  />
    <aura:attribute name="selectedRows" access="public" type="List" default="[]" description="Contains list of selected rows keyFields"/>
    <aura:attribute name="errors" type="Map"  access="public" default="{'rows': {}}" description="Contains Error Map" />
    <aura:attribute name="showRowSelection" type="Boolean" default="false" access="global"/>
   
    <!--Handler Section -->
    <aura:handler name="dtActionClick" event="ldtp:clickedDtAction" action="{!c.handleActionClick}"/>
    <aura:handler name="dtRowSelected" event="ldtp:onDtRowSelection" action="{!c.handleRowSelection}"/>
    <aura:handler name="dtCellEvent" event="ldtp:cellEvent" action="{!c.handleCellChange}"/>
    <aura:handler name="init" value="{!this}" action="{!c.getRecords}" />
    
    <!--Table Begins -->
    <ldtp:datatable aura:id="table"  selectedRows="{!v.selectedRows}" keyField="Id" allowMultiSelect="true" errors="{!v.errors}" dataRows="{!v.rows}" header="{!v.colMap}" config="{!v.columnConfig}"  />
</aura:application>