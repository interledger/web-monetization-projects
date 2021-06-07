.class public Landroidx/appcompat/view/menu/D;
.super Landroidx/appcompat/view/menu/l;
.source ""

# interfaces
.implements Landroid/view/SubMenu;


# instance fields
.field private B:Landroidx/appcompat/view/menu/l;

.field private C:Landroidx/appcompat/view/menu/p;


# direct methods
.method public constructor <init>(Landroid/content/Context;Landroidx/appcompat/view/menu/l;Landroidx/appcompat/view/menu/p;)V
    .locals 0

    invoke-direct {p0, p1}, Landroidx/appcompat/view/menu/l;-><init>(Landroid/content/Context;)V

    iput-object p2, p0, Landroidx/appcompat/view/menu/D;->B:Landroidx/appcompat/view/menu/l;

    iput-object p3, p0, Landroidx/appcompat/view/menu/D;->C:Landroidx/appcompat/view/menu/p;

    return-void
.end method


# virtual methods
.method public a(Landroidx/appcompat/view/menu/l$a;)V
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/view/menu/D;->B:Landroidx/appcompat/view/menu/l;

    invoke-virtual {v0, p1}, Landroidx/appcompat/view/menu/l;->a(Landroidx/appcompat/view/menu/l$a;)V

    return-void
.end method

.method a(Landroidx/appcompat/view/menu/l;Landroid/view/MenuItem;)Z
    .locals 1

    invoke-super {p0, p1, p2}, Landroidx/appcompat/view/menu/l;->a(Landroidx/appcompat/view/menu/l;Landroid/view/MenuItem;)Z

    move-result v0

    if-nez v0, :cond_1

    iget-object v0, p0, Landroidx/appcompat/view/menu/D;->B:Landroidx/appcompat/view/menu/l;

    invoke-virtual {v0, p1, p2}, Landroidx/appcompat/view/menu/l;->a(Landroidx/appcompat/view/menu/l;Landroid/view/MenuItem;)Z

    move-result p1

    if-eqz p1, :cond_0

    goto :goto_0

    :cond_0
    const/4 p1, 0x0

    goto :goto_1

    :cond_1
    :goto_0
    const/4 p1, 0x1

    :goto_1
    return p1
.end method

.method public a(Landroidx/appcompat/view/menu/p;)Z
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/view/menu/D;->B:Landroidx/appcompat/view/menu/l;

    invoke-virtual {v0, p1}, Landroidx/appcompat/view/menu/l;->a(Landroidx/appcompat/view/menu/p;)Z

    move-result p1

    return p1
.end method

.method public b(Landroidx/appcompat/view/menu/p;)Z
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/view/menu/D;->B:Landroidx/appcompat/view/menu/l;

    invoke-virtual {v0, p1}, Landroidx/appcompat/view/menu/l;->b(Landroidx/appcompat/view/menu/p;)Z

    move-result p1

    return p1
.end method

.method public d()Ljava/lang/String;
    .locals 3

    iget-object v0, p0, Landroidx/appcompat/view/menu/D;->C:Landroidx/appcompat/view/menu/p;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, Landroidx/appcompat/view/menu/p;->getItemId()I

    move-result v0

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    if-nez v0, :cond_1

    const/4 v0, 0x0

    return-object v0

    :cond_1
    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    invoke-super {p0}, Landroidx/appcompat/view/menu/l;->d()Ljava/lang/String;

    move-result-object v2

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v2, ":"

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, v0}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    return-object v0
.end method

.method public getItem()Landroid/view/MenuItem;
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/view/menu/D;->C:Landroidx/appcompat/view/menu/p;

    return-object v0
.end method

.method public m()Landroidx/appcompat/view/menu/l;
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/view/menu/D;->B:Landroidx/appcompat/view/menu/l;

    invoke-virtual {v0}, Landroidx/appcompat/view/menu/l;->m()Landroidx/appcompat/view/menu/l;

    move-result-object v0

    return-object v0
.end method

.method public o()Z
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/view/menu/D;->B:Landroidx/appcompat/view/menu/l;

    invoke-virtual {v0}, Landroidx/appcompat/view/menu/l;->o()Z

    move-result v0

    return v0
.end method

.method public p()Z
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/view/menu/D;->B:Landroidx/appcompat/view/menu/l;

    invoke-virtual {v0}, Landroidx/appcompat/view/menu/l;->p()Z

    move-result v0

    return v0
.end method

.method public q()Z
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/view/menu/D;->B:Landroidx/appcompat/view/menu/l;

    invoke-virtual {v0}, Landroidx/appcompat/view/menu/l;->q()Z

    move-result v0

    return v0
.end method

.method public setGroupDividerEnabled(Z)V
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/view/menu/D;->B:Landroidx/appcompat/view/menu/l;

    invoke-virtual {v0, p1}, Landroidx/appcompat/view/menu/l;->setGroupDividerEnabled(Z)V

    return-void
.end method

.method public setHeaderIcon(I)Landroid/view/SubMenu;
    .locals 0

    invoke-super {p0, p1}, Landroidx/appcompat/view/menu/l;->d(I)Landroidx/appcompat/view/menu/l;

    move-object p1, p0

    check-cast p1, Landroid/view/SubMenu;

    return-object p1
.end method

.method public setHeaderIcon(Landroid/graphics/drawable/Drawable;)Landroid/view/SubMenu;
    .locals 0

    invoke-super {p0, p1}, Landroidx/appcompat/view/menu/l;->a(Landroid/graphics/drawable/Drawable;)Landroidx/appcompat/view/menu/l;

    move-object p1, p0

    check-cast p1, Landroid/view/SubMenu;

    return-object p1
.end method

.method public setHeaderTitle(I)Landroid/view/SubMenu;
    .locals 0

    invoke-super {p0, p1}, Landroidx/appcompat/view/menu/l;->e(I)Landroidx/appcompat/view/menu/l;

    move-object p1, p0

    check-cast p1, Landroid/view/SubMenu;

    return-object p1
.end method

.method public setHeaderTitle(Ljava/lang/CharSequence;)Landroid/view/SubMenu;
    .locals 0

    invoke-super {p0, p1}, Landroidx/appcompat/view/menu/l;->a(Ljava/lang/CharSequence;)Landroidx/appcompat/view/menu/l;

    move-object p1, p0

    check-cast p1, Landroid/view/SubMenu;

    return-object p1
.end method

.method public setHeaderView(Landroid/view/View;)Landroid/view/SubMenu;
    .locals 0

    invoke-super {p0, p1}, Landroidx/appcompat/view/menu/l;->a(Landroid/view/View;)Landroidx/appcompat/view/menu/l;

    move-object p1, p0

    check-cast p1, Landroid/view/SubMenu;

    return-object p1
.end method

.method public setIcon(I)Landroid/view/SubMenu;
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/view/menu/D;->C:Landroidx/appcompat/view/menu/p;

    invoke-virtual {v0, p1}, Landroidx/appcompat/view/menu/p;->setIcon(I)Landroid/view/MenuItem;

    return-object p0
.end method

.method public setIcon(Landroid/graphics/drawable/Drawable;)Landroid/view/SubMenu;
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/view/menu/D;->C:Landroidx/appcompat/view/menu/p;

    invoke-virtual {v0, p1}, Landroidx/appcompat/view/menu/p;->setIcon(Landroid/graphics/drawable/Drawable;)Landroid/view/MenuItem;

    return-object p0
.end method

.method public setQwertyMode(Z)V
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/view/menu/D;->B:Landroidx/appcompat/view/menu/l;

    invoke-virtual {v0, p1}, Landroidx/appcompat/view/menu/l;->setQwertyMode(Z)V

    return-void
.end method

.method public t()Landroid/view/Menu;
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/view/menu/D;->B:Landroidx/appcompat/view/menu/l;

    return-object v0
.end method
