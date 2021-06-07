.class public Landroidx/appcompat/view/menu/j;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Landroidx/appcompat/view/menu/v;
.implements Landroid/widget/AdapterView$OnItemClickListener;


# annotations
.annotation system Ldalvik/annotation/MemberClasses;
    value = {
        Landroidx/appcompat/view/menu/j$a;
    }
.end annotation


# instance fields
.field a:Landroid/content/Context;

.field b:Landroid/view/LayoutInflater;

.field c:Landroidx/appcompat/view/menu/l;

.field d:Landroidx/appcompat/view/menu/ExpandedMenuView;

.field e:I

.field f:I

.field g:I

.field private h:Landroidx/appcompat/view/menu/v$a;

.field i:Landroidx/appcompat/view/menu/j$a;


# direct methods
.method public constructor <init>(II)V
    .locals 0

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput p1, p0, Landroidx/appcompat/view/menu/j;->g:I

    iput p2, p0, Landroidx/appcompat/view/menu/j;->f:I

    return-void
.end method

.method public constructor <init>(Landroid/content/Context;I)V
    .locals 1

    const/4 v0, 0x0

    invoke-direct {p0, p2, v0}, Landroidx/appcompat/view/menu/j;-><init>(II)V

    iput-object p1, p0, Landroidx/appcompat/view/menu/j;->a:Landroid/content/Context;

    iget-object p1, p0, Landroidx/appcompat/view/menu/j;->a:Landroid/content/Context;

    invoke-static {p1}, Landroid/view/LayoutInflater;->from(Landroid/content/Context;)Landroid/view/LayoutInflater;

    move-result-object p1

    iput-object p1, p0, Landroidx/appcompat/view/menu/j;->b:Landroid/view/LayoutInflater;

    return-void
.end method


# virtual methods
.method public a(Landroid/view/ViewGroup;)Landroidx/appcompat/view/menu/w;
    .locals 3

    iget-object v0, p0, Landroidx/appcompat/view/menu/j;->d:Landroidx/appcompat/view/menu/ExpandedMenuView;

    if-nez v0, :cond_1

    iget-object v0, p0, Landroidx/appcompat/view/menu/j;->b:Landroid/view/LayoutInflater;

    sget v1, La/a/g;->abc_expanded_menu_layout:I

    const/4 v2, 0x0

    invoke-virtual {v0, v1, p1, v2}, Landroid/view/LayoutInflater;->inflate(ILandroid/view/ViewGroup;Z)Landroid/view/View;

    move-result-object p1

    check-cast p1, Landroidx/appcompat/view/menu/ExpandedMenuView;

    iput-object p1, p0, Landroidx/appcompat/view/menu/j;->d:Landroidx/appcompat/view/menu/ExpandedMenuView;

    iget-object p1, p0, Landroidx/appcompat/view/menu/j;->i:Landroidx/appcompat/view/menu/j$a;

    if-nez p1, :cond_0

    new-instance p1, Landroidx/appcompat/view/menu/j$a;

    invoke-direct {p1, p0}, Landroidx/appcompat/view/menu/j$a;-><init>(Landroidx/appcompat/view/menu/j;)V

    iput-object p1, p0, Landroidx/appcompat/view/menu/j;->i:Landroidx/appcompat/view/menu/j$a;

    :cond_0
    iget-object p1, p0, Landroidx/appcompat/view/menu/j;->d:Landroidx/appcompat/view/menu/ExpandedMenuView;

    iget-object v0, p0, Landroidx/appcompat/view/menu/j;->i:Landroidx/appcompat/view/menu/j$a;

    invoke-virtual {p1, v0}, Landroid/widget/ListView;->setAdapter(Landroid/widget/ListAdapter;)V

    iget-object p1, p0, Landroidx/appcompat/view/menu/j;->d:Landroidx/appcompat/view/menu/ExpandedMenuView;

    invoke-virtual {p1, p0}, Landroid/widget/ListView;->setOnItemClickListener(Landroid/widget/AdapterView$OnItemClickListener;)V

    :cond_1
    iget-object p1, p0, Landroidx/appcompat/view/menu/j;->d:Landroidx/appcompat/view/menu/ExpandedMenuView;

    return-object p1
.end method

.method public a(Landroid/content/Context;Landroidx/appcompat/view/menu/l;)V
    .locals 2

    iget v0, p0, Landroidx/appcompat/view/menu/j;->f:I

    if-eqz v0, :cond_0

    new-instance v1, Landroid/view/ContextThemeWrapper;

    invoke-direct {v1, p1, v0}, Landroid/view/ContextThemeWrapper;-><init>(Landroid/content/Context;I)V

    iput-object v1, p0, Landroidx/appcompat/view/menu/j;->a:Landroid/content/Context;

    :goto_0
    iget-object p1, p0, Landroidx/appcompat/view/menu/j;->a:Landroid/content/Context;

    invoke-static {p1}, Landroid/view/LayoutInflater;->from(Landroid/content/Context;)Landroid/view/LayoutInflater;

    move-result-object p1

    iput-object p1, p0, Landroidx/appcompat/view/menu/j;->b:Landroid/view/LayoutInflater;

    goto :goto_1

    :cond_0
    iget-object v0, p0, Landroidx/appcompat/view/menu/j;->a:Landroid/content/Context;

    if-eqz v0, :cond_1

    iput-object p1, p0, Landroidx/appcompat/view/menu/j;->a:Landroid/content/Context;

    iget-object p1, p0, Landroidx/appcompat/view/menu/j;->b:Landroid/view/LayoutInflater;

    if-nez p1, :cond_1

    goto :goto_0

    :cond_1
    :goto_1
    iput-object p2, p0, Landroidx/appcompat/view/menu/j;->c:Landroidx/appcompat/view/menu/l;

    iget-object p1, p0, Landroidx/appcompat/view/menu/j;->i:Landroidx/appcompat/view/menu/j$a;

    if-eqz p1, :cond_2

    invoke-virtual {p1}, Landroidx/appcompat/view/menu/j$a;->notifyDataSetChanged()V

    :cond_2
    return-void
.end method

.method public a(Landroidx/appcompat/view/menu/l;Z)V
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/view/menu/j;->h:Landroidx/appcompat/view/menu/v$a;

    if-eqz v0, :cond_0

    invoke-interface {v0, p1, p2}, Landroidx/appcompat/view/menu/v$a;->a(Landroidx/appcompat/view/menu/l;Z)V

    :cond_0
    return-void
.end method

.method public a(Landroidx/appcompat/view/menu/v$a;)V
    .locals 0

    iput-object p1, p0, Landroidx/appcompat/view/menu/j;->h:Landroidx/appcompat/view/menu/v$a;

    return-void
.end method

.method public a(Z)V
    .locals 0

    iget-object p1, p0, Landroidx/appcompat/view/menu/j;->i:Landroidx/appcompat/view/menu/j$a;

    if-eqz p1, :cond_0

    invoke-virtual {p1}, Landroidx/appcompat/view/menu/j$a;->notifyDataSetChanged()V

    :cond_0
    return-void
.end method

.method public a()Z
    .locals 1

    const/4 v0, 0x0

    return v0
.end method

.method public a(Landroidx/appcompat/view/menu/D;)Z
    .locals 2

    invoke-virtual {p1}, Landroidx/appcompat/view/menu/l;->hasVisibleItems()Z

    move-result v0

    if-nez v0, :cond_0

    const/4 p1, 0x0

    return p1

    :cond_0
    new-instance v0, Landroidx/appcompat/view/menu/m;

    invoke-direct {v0, p1}, Landroidx/appcompat/view/menu/m;-><init>(Landroidx/appcompat/view/menu/l;)V

    const/4 v1, 0x0

    invoke-virtual {v0, v1}, Landroidx/appcompat/view/menu/m;->a(Landroid/os/IBinder;)V

    iget-object v0, p0, Landroidx/appcompat/view/menu/j;->h:Landroidx/appcompat/view/menu/v$a;

    if-eqz v0, :cond_1

    invoke-interface {v0, p1}, Landroidx/appcompat/view/menu/v$a;->a(Landroidx/appcompat/view/menu/l;)Z

    :cond_1
    const/4 p1, 0x1

    return p1
.end method

.method public a(Landroidx/appcompat/view/menu/l;Landroidx/appcompat/view/menu/p;)Z
    .locals 0

    const/4 p1, 0x0

    return p1
.end method

.method public b()Landroid/widget/ListAdapter;
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/view/menu/j;->i:Landroidx/appcompat/view/menu/j$a;

    if-nez v0, :cond_0

    new-instance v0, Landroidx/appcompat/view/menu/j$a;

    invoke-direct {v0, p0}, Landroidx/appcompat/view/menu/j$a;-><init>(Landroidx/appcompat/view/menu/j;)V

    iput-object v0, p0, Landroidx/appcompat/view/menu/j;->i:Landroidx/appcompat/view/menu/j$a;

    :cond_0
    iget-object v0, p0, Landroidx/appcompat/view/menu/j;->i:Landroidx/appcompat/view/menu/j$a;

    return-object v0
.end method

.method public b(Landroidx/appcompat/view/menu/l;Landroidx/appcompat/view/menu/p;)Z
    .locals 0

    const/4 p1, 0x0

    return p1
.end method

.method public onItemClick(Landroid/widget/AdapterView;Landroid/view/View;IJ)V
    .locals 0
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "Landroid/widget/AdapterView<",
            "*>;",
            "Landroid/view/View;",
            "IJ)V"
        }
    .end annotation

    iget-object p1, p0, Landroidx/appcompat/view/menu/j;->c:Landroidx/appcompat/view/menu/l;

    iget-object p2, p0, Landroidx/appcompat/view/menu/j;->i:Landroidx/appcompat/view/menu/j$a;

    invoke-virtual {p2, p3}, Landroidx/appcompat/view/menu/j$a;->getItem(I)Landroidx/appcompat/view/menu/p;

    move-result-object p2

    const/4 p3, 0x0

    invoke-virtual {p1, p2, p0, p3}, Landroidx/appcompat/view/menu/l;->a(Landroid/view/MenuItem;Landroidx/appcompat/view/menu/v;I)Z

    return-void
.end method
