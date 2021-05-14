.class Landroidx/recyclerview/widget/m;
.super Landroidx/recyclerview/widget/D$m;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/recyclerview/widget/n;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:Landroidx/recyclerview/widget/n;


# direct methods
.method constructor <init>(Landroidx/recyclerview/widget/n;)V
    .locals 0

    iput-object p1, p0, Landroidx/recyclerview/widget/m;->a:Landroidx/recyclerview/widget/n;

    invoke-direct {p0}, Landroidx/recyclerview/widget/D$m;-><init>()V

    return-void
.end method


# virtual methods
.method public a(Landroidx/recyclerview/widget/D;II)V
    .locals 0

    iget-object p2, p0, Landroidx/recyclerview/widget/m;->a:Landroidx/recyclerview/widget/n;

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D;->computeHorizontalScrollOffset()I

    move-result p3

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D;->computeVerticalScrollOffset()I

    move-result p1

    invoke-virtual {p2, p3, p1}, Landroidx/recyclerview/widget/n;->a(II)V

    return-void
.end method
